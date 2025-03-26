import express, { Request, Response} from "express";
import {searchController} from "../controllers/searchController";

export const searchRouter =  () => {
    const router = express.Router()
    router.get('/', (req: Request, res: Response) => {
        const whatSearch = String(req.query.search)
        const table = String(req.query.table)
        const limit = '50'
        if (table !== 'products' && table !== 'customers') {
             res.status(400).json({ error: "Invalid table. Allowed values: 'products', 'customers'." });
        }
         const result = searchController.getObjectsByArguments(whatSearch,table, limit)
        res.status(200).json({ message: `Searching for '${whatSearch}' in table '${table}', ${result}` })
    })

    return router
}