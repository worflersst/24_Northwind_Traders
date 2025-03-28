import express from "express";
import {suppliersController} from "../controllers/suppliesController";

export const suppliersRouter = () => {
    const router = express.Router()
    router.get('/', async (req, res) => {
        const queryPage = req.query?.page ? Number(req.query.page) : 1;
        const result = await suppliersController.getSuppliersForPage(queryPage)
        res.status(200).json(result)
    })
    router.get('/:id', async (req, res) => {
        const id = Number(req.params.id)
        const result = await suppliersController.getSupplierById(id)
        res.status(200).json(result)
    })
    return router
}