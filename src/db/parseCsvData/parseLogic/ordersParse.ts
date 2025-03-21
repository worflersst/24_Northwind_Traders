import path from "path";
import fs from 'fs';
import csv from 'csv-parser';

interface orderI {
    OrderID: number;
    CustomerID: string;
    EmployeeID: number;
    OrderDate: string;
    RequiredDate: string;
    ShippedDate: string | null;
    ShipVia: number;
    Freight: number;
    ShipName: string;
    ShipAddress: string;
    ShipCity: string;
    ShipRegion: string | null;
    ShipPostalCode: string | number;
    ShipCountry: string;
}

export const ordersParse = async (): Promise<orderI[]> => {
    let records: orderI[] = [];

    const filePath = path.resolve(process.cwd(), './src/db/parseCsvData/csvFiles/Orders.csv');

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                records.push({
                    OrderID: Number(row.OrderID),
                    CustomerID: row.CustomerID,
                    EmployeeID: Number(row.EmployeeID),
                    OrderDate: row.OrderDate,
                    RequiredDate: row.RequiredDate,
                    ShippedDate: row.ShippedDate && row.ShippedDate.trim() !== '' ? row.ShippedDate : null,
                    ShipVia: Number(row.ShipVia),
                    Freight: Number(row.Freight),
                    ShipName: row.ShipName,
                    ShipAddress: row.ShipAddress,
                    ShipCity: row.ShipCity,
                    ShipRegion: row.ShipRegion && row.ShipRegion.trim() !== '' ? row.ShipRegion : null,
                    ShipPostalCode: isNaN(Number(row.ShipPostalCode)) ? row.ShipPostalCode : Number(row.ShipPostalCode),
                    ShipCountry: row.ShipCountry
                });
            })
            .on('end', () => {
                console.log(records);
                resolve(records);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};
