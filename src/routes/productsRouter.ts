import express from "express";


export const productsRouter =  () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = req.query?.page || 1
        //const result = productsController.giveProductsForPage(queryPage)
        res.status(200).json()
    })
    router.get('/:id', (req, res) => {
        const params = req.params.id
        // const result = productsController.giveProductsById(params)
        res.status(200).json()
    })
    return router
}