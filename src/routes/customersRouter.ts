import express from "express";
import {customersController} from "../controllers/customersController";

export const customersRouter =  () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = String(req.query?.page) || '1'
        const result = customersController.getCustomersForPage(queryPage)
    res.status(200).json(result)
    })
    router.get('/:id', (req, res) => {
        const id = req.params.id
         const result = customersController.getCustomersById(id)
        res.status(200).json(result)
    })
    return router
}