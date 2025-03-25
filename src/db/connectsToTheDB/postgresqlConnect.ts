import pg from 'pg'
import {insertAllData} from "../insertDBData/insertAllData";
const {Client} = pg

export enum postgresTableName {
     Regions = 'Regions',
     Territories = 'Territories',
     Employees = 'Employees',
     Shippers = 'Shippers' ,
     Supplies = 'Supplies' ,
     Category = 'Category' ,
     Products = 'Products' ,
     Customers = 'Customers' ,
     Orders = 'Orders' ,
     OrderDetails = 'OrderDetails' ,
     EmployeeTerritories = 'EmployeeTerritories'
}

export const client = new Client({
    user: 'postgres',
    password: '34385734',
    host: 'localhost',
    port: 3000,
    database: 'northwind_traders',
})

export const runDB = async () => {
    try {
        await client.connect()
        console.log("Connected to the database");
        await insertAllData()
    }catch (error) {
        await client.end()
        console.log(`Can't connect to the database: ${error}`);
    }
}

