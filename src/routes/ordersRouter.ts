import express from "express";
import {ordersController} from "../controllers/ordersController";


export const ordersRouter =  () => {
    const router = express.Router()
    router.get('/', async (req, res) => {
        const queryPage = req.query?.page ? Number(req.query.page) : 1;
        const result = await ordersController.getOrdersForPage(queryPage)
        res.status(200).json(result)
    })
    router.get('/:id', async (req, res) => {
        const id = Number(req.params.id)
         const result = await ordersController.getOrdersById(id)
        res.status(200).json(result)
    })
    return router
}