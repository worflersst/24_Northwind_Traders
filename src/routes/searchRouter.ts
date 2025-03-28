import express, { Request, Response} from "express";
import {searchController} from "../controllers/searchController";

export const searchRouter =  () => {
    const router = express.Router()
    router.get('/', async (req: Request, res: Response) => {
        const whatSearch = String(req.query.search)
        const table = String(req.query.table)
        const limit = 50
        if (table !== 'Products' && table !== 'Customers') {
             res.status(400).json({ error: "Invalid table. Allowed values: 'Products', 'Customers'." });
        }
         const result = await searchController.getObjectsByArguments(whatSearch,table, limit)
        res.status(200).json(result)
    })

    return router
}