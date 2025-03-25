import pg from 'pg'
const {Client} = pg


export const runDB = async () => {
    const client = new Client({
        user: 'postgres',
        password: '34385734',
        host: 'localhost',
        port: 3000,
        database: 'northwind_traders',
    })
    try {
        await client.connect()
        console.log("Connected to the database");
    }catch (error) {
        await client.end()
        console.log(`Can't connect to the database: ${error}`);
    }
}

