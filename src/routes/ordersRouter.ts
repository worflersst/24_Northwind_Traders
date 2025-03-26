import express from "express";


export const ordersRouter =  () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = req.query?.page || 1
        //const result = ordersController.giveOrdersForPage(queryPage)
        res.status(200).json()
    })
    router.get('/:id', (req, res) => {
        const params = req.params.id
        // const result = ordersController.giveOrdersById(params)
        res.status(200).json()
    })
    return router
}