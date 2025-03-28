import { categoriesParse } from "../parseCsvData/parseLogic/categoriesParse";
import { client, postgresTableName } from "../connectsToTheDB/postgresqlConnect";
import { regionsParse } from "../parseCsvData/parseLogic/regionsParse";
import { territoriesParse } from "../parseCsvData/parseLogic/territoriesParse";
import { employeesParse } from "../parseCsvData/parseLogic/employeesParse";
import { shippersParse } from "../parseCsvData/parseLogic/shippersParse";
import { suppliesParse } from "../parseCsvData/parseLogic/suppliesParse";
import { productsParse } from "../parseCsvData/parseLogic/productsParse";
import { customersParse } from "../parseCsvData/parseLogic/customersParse";
import { ordersParse } from "../parseCsvData/parseLogic/ordersParse";
import { orderDetailsParse } from "../parseCsvData/parseLogic/orderDetailsParse";
import { employeeTerritoriesParse } from "../parseCsvData/parseLogic/employeeTerritoriesParse";

const parsers: Record<string, () => Promise<any[]>> = {
    Regions: regionsParse,
    Territories: territoriesParse,
    Employees: employeesParse,
    Shippers: shippersParse,
    Supplies: suppliesParse,
    Category: categoriesParse,
    Products: productsParse,
    Customers: customersParse,
    Orders: ordersParse,
    OrderDetails: orderDetailsParse,
    EmployeeTerritories: employeeTerritoriesParse,
};

const generateQuery = (data: any[], tableName: string) => {
    const column = Object.keys(data[0]);
    const queryPiace = data
        .map((_, i) => `(${column.map((_, j) => `$${i * column.length + j + 1}`).join(", ")})`)
        .join(", ");

    const query = `INSERT INTO ${tableName}(${column.join(",")}) VALUES ${queryPiace}`;
    const values = data.flatMap(row => Object.values(row));
    return { query, values };
};

const insertData = async (tableName: string) => {
    const result = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
    if (parseInt(result.rows[0].count) === 0) {
        const parser = parsers[tableName];
        if (!parser) {
            console.error(`Парсер для ${tableName} не найден`);
            return;
        }

        const data = await parser();
        if (data.length === 0) {
            console.log(`Нет данных для вставки в ${tableName}`);
            return;
        }

        const { query, values } = generateQuery(data, tableName);

        try {
            await client.query(query, values);
            console.log(`Данные успешно вставлены в таблицу ${tableName}`);
        } catch (error) {
            console.error(`Ошибка при вставке данных в ${tableName}:`, error);
        }
    }
};

export const insertAllData = async () => {
    await Promise.all(Object.values(postgresTableName).map(insertData));
};
