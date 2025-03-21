import path from "path";
import fs from "fs";
import csv from "csv-parser";

interface ProductI {
    ProductID: number;
    ProductName: string;
    SupplierID: number;
    CategoryID: number;
    QuantityPerUnit: string;
    UnitPrice: number;
    UnitsInStock: number;
    UnitsOnOrder: number;
    ReorderLevel: number;
    Discontinued: boolean;
}

export const productsParse = async (): Promise<ProductI[]> => {
    let records: ProductI[] = [];

    const filePath = path.resolve(process.cwd(), "./src/db/parseCsvData/csvFiles/Products.csv");

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                records.push({
                    ProductID: Number(row.ProductID),
                    ProductName: row.ProductName,
                    SupplierID: Number(row.SupplierID),
                    CategoryID: Number(row.CategoryID),
                    QuantityPerUnit: row.QuantityPerUnit,
                    UnitPrice: Number(row.UnitPrice),
                    UnitsInStock: Number(row.UnitsInStock) || 0,
                    UnitsOnOrder: Number(row.UnitsOnOrder) || 0,
                    ReorderLevel: Number(row.ReorderLevel) || 0,
                    Discontinued: row.Discontinued === "1"
                });
            })
            .on("end", () => {
               // console.log(records)
                resolve(records);
            })
            .on("error", (error) => {
                reject(error);
            });
    });
};
