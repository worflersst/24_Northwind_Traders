import express from "express";
import {suppliersController} from "../controllers/suppliesController";

export const suppliersRouter = () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = String(req.query?.page) || '1'
        const result = suppliersController.getSuppliersForPage(queryPage)
        res.status(200).json(result)
    })
    router.get('/:id', (req, res) => {
        const id = req.params.id
        const result = suppliersController.getSupplierById(id)
        res.status(200).json(result)
    })
    return router
}