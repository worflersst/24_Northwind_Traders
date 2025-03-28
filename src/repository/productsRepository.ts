import {executeAllDataQueries, executeDataByIdQueries} from "./executeQueries";

export const productsRepository = {
    async getProductsForPage (queryPage: number, limit: number = 20) {
        const OFFSET = (limit * queryPage) - limit
        const selectDataQuery =
            `SELECT ProductId,ProductName,SupplierId,CategoryID,QuantityPerUnit,UnitPrice,UnitsInStock,ReorderLevel,Discontinued FROM Products LIMIT ${limit} OFFSET ${OFFSET};`
        const checkCountQuery = 'SELECT COUNT(1) AS TOTAL FROM Products;'
        const queryArray: string[] = [selectDataQuery, checkCountQuery]
        return  await executeAllDataQueries(queryArray, queryPage, limit)
    },
    async getProductsById (id: number) {
        const selectDataQuery =
            `SELECT ProductId, ProductName, Products.SupplierId, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, ReorderLevel, Discontinued, Supplies.CompanyName AS SupplierName FROM Products, Supplies WHERE ProductId = $1 AND Products.SupplierId = Supplies.SupplierID;`
        const queryArray: string[] = [selectDataQuery]
        return await executeDataByIdQueries(queryArray, id)
    }
}