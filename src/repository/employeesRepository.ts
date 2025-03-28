import {executeAllDataQueries, executeDataByIdQueries} from "./executeQueries";

export const employeesRepository = {
    async getEmployeesForPage (queryPage: number, limit: number = 20) {
        const OFFSET = (limit * queryPage) - limit
        const selectDataQuery = `
SELECT
 E.EmployeeID,
 E.FirstName || ' ' || E.LastName AS EmployeeName,
 E.Title,
 E.City,
 E.HomePhone AS Phone,
 E.Country
FROM Employees E
LIMIT ${limit}
OFFSET ${OFFSET};        
`
        const checkCountQuery = 'SELECT COUNT(1) AS TOTAL FROM Employees;'
        const queryArray: string[] = [selectDataQuery, checkCountQuery]
        return  await executeAllDataQueries(queryArray, queryPage, limit)
    },
    async getEmployeesById (id: number) {
        const selectDataQuery = `
SELECT
 E1.EmployeeID,
 E1.FirstName || ' ' || E1.LastName AS EmployeeName,
 E1.Title,
 E1.TitleOfCourtesy,
 TO_CHAR(E1.BirthDate, 'YYYY-MM-DD') AS BirthDate,
 TO_CHAR(E1.HireDate, 'YYYY-MM-DD') AS HireDate,
 E1.Address,
 E1.City,
 E1.PostalCode,
 E1.Country,
 E1.HomePhone,
 E1.Extension,
 E2.FirstName || ' ' || E2.LastName AS ReportsTo
FROM Employees E1
LEFT JOIN Employees E2 ON E1.ReportsTo = E2.EmployeeID
WHERE E1.EmployeeID = $1
ORDER BY E1.EmployeeID;            
`
        const queryArray: string[] = [selectDataQuery]
        return await executeDataByIdQueries(queryArray, id)
    }
}