import path from "path";
import fs from 'fs'
import csv from 'csv-parser'

interface territoryI {
    TerritoryID: number,
    TerritoryDescription: string,
    RegionID: number


}

export const territoriesParse = async (): Promise<territoryI[]> => {
    let records:territoryI[]  = []

    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/Territories.csv');

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                records.push({
                    TerritoryID: Number(row.TerritoryID),
                    TerritoryDescription: row.TerritoryDescription,
                    RegionID: Number(row.RegionID),
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