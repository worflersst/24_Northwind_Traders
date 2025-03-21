import path from "path";
import fs from 'fs'
import csv from 'csv-parser'

interface shipperI {
    ShipperID:number ,
    CompanyName: string,
    Phone: string

}

export const shippersParse = async (): Promise<shipperI[]> => {
    let records:shipperI[]  = []

    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/Shippers.csv');

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                records.push({
                    ShipperID: Number(row.ShipperID),
                    CompanyName: row.CompanyName,
                    Phone: row.Phone
                })

            })
            .on('end', () => {
                 // console.log(records)
                resolve(records)
            })
            .on('error', (error) => {
                reject(error)
            })
    })
}