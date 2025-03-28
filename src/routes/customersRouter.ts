import express from "express";
import {customersController} from "../controllers/customersController";

export const customersRouter =  () => {
    const router = express.Router()
    router.get('/', async (req, res) => {
        const queryPage = req.query?.page ? Number(req.query.page) : 1;
        const result = await customersController.getCustomersForPage(queryPage)
    res.status(200).json(result)
    })
    router.get('/:id', async (req, res) => {
        const id = req.params.id
         const result = await customersController.getCustomersById(id)
        res.status(200).json(result)
    })
    return router
}