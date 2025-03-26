import express from "express";
import {productsController} from "../controllers/productController";


export const productsRouter =  () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = String(req.query?.page) || '1'
        const result = productsController.getProductsForPage(queryPage)
        res.status(200).json(result)
    })
    router.get('/:id', (req, res) => {
        const id = req.params.id
         const result = productsController.getProductsById(id)
        res.status(200).json(result)
    })
    return router
}