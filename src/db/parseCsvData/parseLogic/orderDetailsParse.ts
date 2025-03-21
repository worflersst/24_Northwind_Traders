import path from "path";
import fs from 'fs'
import csv from 'csv-parser'

interface orderDetailI {
    OrderID: number,
    ProductID: number,
    UnitPrice: number,
    Quantity: number,
    Discount: number
}

export const orderDetailsParse = async (): Promise<orderDetailI[]> => {
    let records:orderDetailI[]  = []

    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/orderDetails.csv');

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                records.push({
                    OrderID: Number(row.OrderID),
                    ProductID: Number(row.ProductID),
                    UnitPrice: Number(row.UnitPrice),
                    Quantity: Number(row.Quantity),
                    Discount: Number(row.Discount)
                })

            })
            .on('end', () => {
                 console.log(records)
                resolve(records)
            })
            .on('error', (error) => {
                reject(error)
            })
    })
}