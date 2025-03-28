import {executeAllDataQueries, executeDataByIdQueries} from "./executeQueries";

export const suppliersRepository = {
    async getSuppliersForPage (queryPage: number, limit: number = 20) {
        const OFFSET = (limit * queryPage) - limit
        const selectDataQuery =
            `SELECT SupplierID AS ID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, HomePage FROM Supplies LIMIT ${limit} OFFSET ${OFFSET};`
        const checkCountQuery = 'SELECT COUNT(1) AS TOTAL FROM Supplies;'
        const queryArray: string[] = [selectDataQuery, checkCountQuery]
        return  await executeAllDataQueries(queryArray, queryPage, limit)
    },
    async getSupplierById (id: number) {
        const selectDataQuery =
            `SELECT SupplierID AS ID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax, HomePage FROM Supplies WHERE SupplierID = $1;`
        const queryArray: string[] = [selectDataQuery]
        return await executeDataByIdQueries(queryArray, id)
    }
}