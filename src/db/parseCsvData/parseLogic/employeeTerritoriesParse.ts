import path from "path";
import fs from 'fs'
import csv from 'csv-parser'

interface employeeTerritoryI {
    EmployeeID: number,
    TerritoryID: number
}

export const employeeTerritoriesParse = async (): Promise<employeeTerritoryI[]> => {
    let records:employeeTerritoryI[]  = []

    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/employeeTerritories.csv');

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                records.push({
                    EmployeeID: Number(row.EmployeeID),
                    TerritoryID: Number(row.TerritoryID)
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