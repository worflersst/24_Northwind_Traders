import path from "path";
import fs from 'fs'
import csv from 'csv-parser'

interface RegionI {
    RegionID: number,
    RegionDescription: string

}

export const regionsParse = async (): Promise<RegionI[]> => {
    let records:RegionI[]  = []

    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/Regions.csv');

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                records.push({
                    RegionID: Number(row.RegionID),
                    RegionDescription: row.RegionDescription
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