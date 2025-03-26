import express from "express";

export const suppliersRouter = () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = req.query?.page || 1
        //const result = suppliersController.giveSuppliersForPage(queryPage)
        res.status(200).json()
    })
    router.get('/:id', (req, res) => {
        const params = req.params.id
        // const result = suppliersController.giveSuppliersById(params)
        res.status(200).json()
    })
    return router
}