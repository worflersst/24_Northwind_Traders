import {executeAllDataQueries, executeDataByIdQueries} from "./executeQueries";

export const customersRepository = {
    async getСustomersForPage (queryPage: number, limit: number = 20) {
        const OFFSET = (limit * queryPage) - limit
        const selectDataQuery = `
SELECT
    C.CustomerID,
    C.CompanyName,
    C.ContactTitle AS Contact,
    C.ContactTitle AS Title,
    C.City,
    C.Country
FROM Customers C
LIMIT ${limit}
OFFSET ${OFFSET};`
        const checkCountQuery = 'SELECT COUNT(1) AS TOTAL FROM Customers;'
        const queryArray: string[] = [selectDataQuery, checkCountQuery]
        return  await executeAllDataQueries(queryArray, queryPage, limit)
    },
    async getCustomerById (id: string) {
        const selectDataQuery = `
SELECT
    C.CustomerID,
    C.CompanyName,
    C.ContactTitle AS Contact,
    C.ContactTitle AS Title,
    C.Address,
    C.City,
    C.Region,
    C.PostalCode,
    C.Country,
    C.Phone,
    C.Fax
FROM Customers C
WHERE C.CustomerID = $1;`
        const queryArray: string[] = [selectDataQuery]
        return await executeDataByIdQueries(queryArray, id)
    }
}