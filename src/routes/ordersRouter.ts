import express from "express";
import {ordersController} from "../controllers/ordersController";


export const ordersRouter =  () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = String(req.query?.page) || '1'
        const result = ordersController.getOrdersForPage(queryPage)
        res.status(200).json(result)
    })
    router.get('/:id', (req, res) => {
        const id = req.params.id
         const result = ordersController.getOrdersById(id)
        res.status(200).json(result)
    })
    return router
}