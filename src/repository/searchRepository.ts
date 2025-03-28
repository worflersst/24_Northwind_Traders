import {executeSearchQueries} from "./executeQueries";

export const searchRepository = {
    async getObjectsByArguments (whatSearch: string, tableName: string, limit: number) {
        let selectDataQuery = ``;
        const searchCondition = whatSearch.trim() === "" ? "" : `WHERE ProductName ILIKE $1`;
        const searchConditionCustomers = whatSearch.trim() === "" ? "" : `
        WHERE 
            C.CompanyName ILIKE $1 
            OR C.ContactName ILIKE $1 
            OR C.ContactTitle ILIKE $1
            OR C.Address ILIKE $1`;

        switch (tableName) {
            case 'Products':
                selectDataQuery = `
SELECT 
    P.ProductID,
    P.ProductName,
    P.SupplierID,
    P.CategoryID,
    P.QuantityPerUnit,
    P.UnitPrice,
    P.UnitsInStock,
    P.UnitsOnOrder,
    P.ReorderLevel,
    P.Discontinued
FROM Products P
${searchCondition}
LIMIT ${limit};`
                break;
            case 'Customers':
                selectDataQuery = `
SELECT 
    C.CustomerID,
    C.CompanyName,
    C.ContactName,
    C.ContactTitle,
    C.Address,
    C.City,
    C.Region,
    C.PostalCode,
    C.Country,
    C.Phone,
    C.Fax
FROM Customers C
${searchConditionCustomers}
LIMIT ${limit};`
                break;
        }

        const queryArray: string[] = [selectDataQuery];
        return await executeSearchQueries(queryArray, whatSearch.trim() === "" ? undefined : `%${whatSearch}%`);
    }
};
