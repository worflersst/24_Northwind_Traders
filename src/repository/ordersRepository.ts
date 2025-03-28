import {executeAllDataQueries, executeOrdersByIdAndProductQueries} from "./executeQueries";

export const ordersRepository = {
    async getOrdersForPage (queryPage: number, limit: number = 20) {
        const OFFSET = (limit * queryPage) - limit
        const selectDataQuery = `
SELECT Orders.OrderID,
 SUM(OrderDetails.UnitPrice * OrderDetails.Quantity ) AS TotalPrice,
 COUNT(OrderDetails.OrderID), SUM(OrderDetails.Quantity) AS Products,
 TO_CHAR(Orders.ShippedDate,'YYYY-MM-DD') AS Shipped,
 Orders.ShipName,
 Orders.ShipCity,
 Orders.ShipCountry
FROM Orders
 LEFT JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
GROUP BY Orders.OrderID
ORDER BY Orders.OrderID ASC
LIMIT ${limit}
OFFSET ${OFFSET};`
        const checkCountQuery = 'SELECT COUNT(1) AS TOTAL FROM Orders;'
        const queryArray: string[] = [selectDataQuery, checkCountQuery]
        return  await executeAllDataQueries(queryArray, queryPage, limit)
    },

    async getOrdersAndProductById (id: number) {
        const selectDataQuery = `
SELECT
 C.CustomerID,
 O.ShipName,
 COUNT(OD.ProductID) AS TotalProducts,
 SUM(OD.Quantity),
 SUM(OD.UnitPrice * OD.Quantity) AS TotalPrice,
 SUM(OD.UnitPrice * OD.Quantity * OD.Discount) AS TotalDiscount,
 S.CompanyName,
 O.Freight,
 TO_CHAR(O.OrderDate, 'YYYY-MM-DD') AS OrderDate,
 TO_CHAR(O.RequiredDate, 'YYYY-MM-DD') AS RequiredDate,
 TO_CHAR(O.ShippedDate, 'YYYY-MM-DD') AS ShippedDate,
 O.ShipCity,
 O.ShipRegion,
 O.ShipPostalCode,
 O.ShipCountry
FROM Orders O
JOIN Customers C ON O.CustomerID = C.CustomerID
JOIN OrderDetails OD ON O.OrderID = OD.OrderID
JOIN Shippers S ON S.ShipperID = O.ShipVia
WHERE O.OrderID = $1
GROUP BY O.OrderID, C.CustomerID, S.CompanyName, O.ShipCity, O.ShipRegion,O.ShipPostalCode,O.ShipCountry
ORDER BY O.OrderID ASC;`
        const selectProductQuery = `
SELECT
    O.OrderID,
    OD.ProductID,
    P.ProductName,
    OD.Quantity,
    OD.UnitPrice,
    OD.UnitPrice * OD.Quantity AS TotalPrice,
    OD.Discount
FROM OrderDetails OD
JOIN Products P ON P.ProductId = OD.ProductID
JOIN Orders O ON O.OrderID = OD.OrderID
WHERE OD.OrderID = $1;        
        `
        const queryArray: string[] = [selectDataQuery, selectProductQuery]
        return await executeOrdersByIdAndProductQueries(queryArray, id)
    }
}