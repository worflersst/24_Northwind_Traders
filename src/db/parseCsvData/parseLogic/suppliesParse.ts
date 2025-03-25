import path from "path";
import fs from 'fs'
import csv from 'csv-parser'

interface SupplierI {
    SupplierID: number;
    CompanyName: string;
    ContactName: string;
    ContactTitle: string;
    Address: string;
    City: string;
    Region: string | null;
    PostalCode: string | null;
    Country: string;
    Phone: string;
    Fax: string | null;
    HomePage: string | null;
}

export const suppliesParse = async (): Promise<SupplierI[]> => {
    let records:SupplierI[]  = []

    const cleanString = (value: string ): string  => {
        return value.replace(/[\r\n]+/g, ' ').trim() ;
    };

    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/Supplies.csv');

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                records.push({
                    SupplierID: Number(row.SupplierID),
                    CompanyName: row.CompanyName,
                    ContactName: row.ContactName,
                    ContactTitle: row.ContactTitle,
                    Address: cleanString(row.Address),
                    City: row.City,
                    Region: row.Region == '' ? null : row.Region,
                    PostalCode: row.PostalCode == '' ? null : row.PostalCode,
                    Country: row.Country,
                    Phone: row.Phone,
                    Fax: row.Fax == '' ? null : row.Fax,
                    HomePage: row.HomePage == '' ? null : row.HomePage,
                });

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