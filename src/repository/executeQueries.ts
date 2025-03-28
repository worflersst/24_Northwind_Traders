import {client} from "../db/connectsToTheDB/postgresqlConnect";

export const executeAllDataQueries = async (queryArray: string[], queryPage: number, limit: number) => {
    const startTime = Date.now();

    const cleanedQueries = queryArray.map(query => query.replace(/\n/g, ' '));

    const [selectData, checkCount ] = cleanedQueries;

    const startSelectData = Date.now();
    const allData = await client.query(selectData);
    const timeSelectData = Date.now() - startSelectData;

    const startSelectCount = Date.now();
    const total = await client.query(checkCount);
    const timeSelectCount = Date.now() - startSelectCount;

    const isSelect = selectData.trim().toUpperCase().startsWith("SELECT");
    const hasWhere = /WHERE/i.test(selectData);
    const hasLeftJoin = /LEFT JOIN/i.test(selectData);
    const maxPages = Math.floor(Number(total.rows[0].total) / Number(limit) + 1)
    if (Number(queryPage) > maxPages) {
        return {
            message: `Max page: ${maxPages}`
        }
    }

    return {
        "page": Number(queryPage),
        "pages": maxPages,
        "items": Number(limit),
        "total": Number(total.rows[0].total),
        "stats": {
            "queries": queryArray.length,
            "results": allData.rowCount! + total.rowCount!,
            "queries-type": {
                "select": (isSelect ? 1 : 0) + (total ? 1 : 0),
                "selectHasWhere": hasWhere ? 1 : 0,
                "selectHasLeftJoin": hasLeftJoin ? 1 : 0
            },
            "log": {
                "type": "sql",
                "overallTimeMs": Date.now() - startTime,
                "timestamp": new Date().toISOString(),
                "queries": [{
                    "query":  selectData,
                    "duration": `${timeSelectData / 1000 }s`,
                }, {
                    "query":  checkCount,
                    "duration": `${timeSelectCount / 1000}s` ,
                }]
            },

        },
        "selectedData": allData.rows
    };
};

export const executeDataByIdQueries = async (queryArray: string[], idValue: number | string) => {
    const startTime = Date.now();

    const cleanedQueries = queryArray.map(query => query.replace(/\n/g, ' '));

    const [selectData] = cleanedQueries;

    const startSelectData = Date.now();
    const allData = await client.query(selectData, [idValue]);
    const timeSelectData = Date.now() - startSelectData;

    const isSelect = selectData.trim().toUpperCase().startsWith("SELECT");
    const hasWhere = /WHERE/i.test(selectData);
    const hasLeftJoin = /LEFT JOIN/i.test(selectData);

    if (allData.rows.length === 0) {
        return {
            message: 'No such object with this id'
        }
    }

    return {
        "stats": {
            "queries": queryArray.length,
            "results": allData.rowCount! ,
            "queries-type": {
                "select": isSelect ? 1 : 0,
                "selectHasWhere": hasWhere ? 1 : 0,
                "selectHasLeftJoin": hasLeftJoin ? 1 : 0
            },
            "log": {
                "type": "sql",
                "overallTimeMs": Date.now() - startTime,
                "timestamp": new Date().toISOString(),
                "queries": [{
                    "query":  selectData,
                    "duration": `${timeSelectData / 1000 }s`,
                }]
            },

        },
        "selectedData": allData.rows
    };
};

export const executeOrdersByIdAndProductQueries = async (queryArray: string[], idValue: number) => {
    const startTime = Date.now();

    const cleanedQueries = queryArray.map(query => query.replace(/\n/g, ' '));

    const [selectOrders, productOrders ] = cleanedQueries;

    const startSelectData = Date.now();
    const allData = await client.query(selectOrders, [idValue]);
    const timeSelectData = Date.now() - startSelectData;

    const startSelectCount = Date.now();
    const productsInOrder = await client.query(productOrders, [idValue]);
    const timeSelectCount = Date.now() - startSelectCount;

    const isSelect = selectOrders.trim().toUpperCase().startsWith("SELECT");
    const hasWhere = /WHERE/i.test(selectOrders);
    const hasLeftJoin = /LEFT JOIN/i.test(selectOrders);

    const isSelect2 = productOrders.trim().toUpperCase().startsWith("SELECT");
    const hasWhere2 = /WHERE/i.test(productOrders);
    const hasLeftJoin2 = /LEFT JOIN/i.test(productOrders);

    if (allData.rows.length === 0) {
        return {
            message: 'No such object with this id'
        }
    }

    return {
        "stats": {
            "queries": queryArray.length,
            "results": allData.rowCount! ,
            "queries-type": {
                "select": (isSelect ? 1 : 0) + (isSelect2 ? 1 : 0)  ,
                "selectHasWhere": (hasWhere ? 1 : 0) + (hasWhere2 ? 1 : 0) ,
                "selectHasLeftJoin": (hasLeftJoin ? 1 : 0) + (hasLeftJoin2 ? 1 : 0)
            },
            "log": {
                "type": "sql",
                "overallTimeMs": Date.now() - startTime,
                "timestamp": new Date().toISOString(),
                "queries": [
                    {
                    "query":  selectOrders,
                    "duration": `${timeSelectData / 1000 }s`,
                    },
                    {
                        "query":  productOrders,
                        "duration": `${timeSelectCount / 1000 }s`,
                    }
                ]
            },

        },
        "orders": allData.rows,
        "products": productsInOrder.rows
    };
};

export const executeSearchQueries = async (queryArray: string[], whatSearch: string | undefined) => {
    const startTime = Date.now();

    const cleanedQueries = queryArray.map(query => query.replace(/\n/g, ' '));

    const [selectData ] = cleanedQueries;

    const startSelectData = Date.now();
    const allData = await client.query(selectData, whatSearch ? [whatSearch] : []);
    const timeSelectData = Date.now() - startSelectData;

    const isSelect = selectData.trim().toUpperCase().startsWith("SELECT");
    const hasWhere = /WHERE/i.test(selectData);
    const hasJoin = /JOIN/i.test(selectData);

    return {
        "stats": {
            "queries": queryArray.length,
            "results": allData.rowCount! ,
            "queries-type": {
                "select": (isSelect ? 1 : 0) ,
                "selectHasWhere": hasWhere ? 1 : 0,
                "selectHasJoin": hasJoin ? 1 : 0
            },
            "log": {
                "type": "sql",
                "overallTimeMs": Date.now() - startTime,
                "timestamp": new Date().toISOString(),
                "queries": [{
                    "query":  selectData,
                    "duration": `${timeSelectData / 1000 }s`,
                }]
            },

        },
        "selectedData": allData.rows
    };
};
