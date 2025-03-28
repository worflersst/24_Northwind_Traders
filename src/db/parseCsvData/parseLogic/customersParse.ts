import fs from 'fs'
import path from 'path'
import csv from 'csv-parser';

export interface CustomerI {
    CustomerID: string,
    CompanyName: string,
    ContactName: string,
    ContactTitle: string,
    Address: string | null,
    City: string | null,
    Region: string | null ,
    PostalCode: string | null,
    Country: string | null,
    Phone: string | null,
    Fax: string | null
}

export const customersParse = async (): Promise<CustomerI[]> => {
    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/Customers.csv')

    return new Promise((resolve, reject) => {
        const records: CustomerI[] = []
        fs.createReadStream(filePath)
            .pipe(
               csv()
            )
            .on('data', (row) => {
                records.push({
                    CustomerID: row.CustomerID ,
                    CompanyName: row.CompanyName ,
                    ContactName: row.ContactName ,
                    ContactTitle: row.ContactTitle ,
                    Address: row.Address || null,
                    City: row.City || null,
                    Region: row.Region || null,
                    PostalCode: row.PostalCode || null,
                    Country: row.Country || null,
                    Phone: row.Phone || null,
                    Fax:row.Fax || null
                })
            })
            .on('end', () => {
                 // console.log(records)
                resolve(records)
            })
            .on('error', (error: Error) => reject(error))
    })
}

