import express from "express";
import {productsController} from "../controllers/productController";


export const productsRouter =  () => {
    const router = express.Router()
    router.get('/', async (req, res) => {
        const queryPage = req.query?.page ? Number(req.query.page) : 1;
        const result = await productsController.getProductsForPage(queryPage)
        res.status(200).json(result)
    })
    router.get('/:id', async (req, res) => {
        const id = Number(req.params.id)
         const result = await productsController.getProductsById(id)
        res.status(200).json(result)
    })
    return router
}