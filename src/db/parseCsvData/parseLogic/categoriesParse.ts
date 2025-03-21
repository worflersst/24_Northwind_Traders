import fs from 'fs'
import path from 'path'
import csv from "csv-parser";

interface CategoryI {
    CategoryID: number,
    CategoryName: string,
    Description: string
}

export const categoriesParse = async (): Promise<CategoryI[]> => {
    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/Categories.csv')

    return new Promise((resolve, reject) => {
        const records: CategoryI[] = []

        fs.createReadStream(filePath)
            .pipe(
                csv()
            )
            .on('data', (row) => {
                if (Object.keys(row).length >= 4) {
                    let arrayForConcat = []
                    arrayForConcat.push({
                        CategoryID: Number(row.CategoryID),
                        CategoryName: row.CategoryName ,
                        Description: `${row.Description},`
                    })

                    const keyForDelete = Object.keys(row).slice(0, 3)

                    keyForDelete.forEach((key) => delete row[key])
                    for (const prop in row) {
                        arrayForConcat[0].Description += `${row[prop]},`
                    }
                    records.push(arrayForConcat[0])
                    return
                }
                records.push({
                    CategoryID: Number(row.CategoryID),
                    CategoryName: row.CategoryName,
                    Description: row.Description
                })
            })
            .on('end', () => {
                 // console.table(records)
                resolve(records)
            })
            .on('error', (error: Error) => reject(error))
    })
}
