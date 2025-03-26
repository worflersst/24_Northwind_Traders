import express from "express";

export const customersRouter =  () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = req.query?.page || 1
        //const result = CustomersController.giveCustomersForPage(queryPage)
    res.status(200).json()
    })
    router.get('/:id', (req, res) => {
        const params = req.params.id
        // const result = CustomersController.giveCustomersById(params)
        res.status(200).json()
    })
    return router
}