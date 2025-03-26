import express from "express";


export const employeesRouter =  () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = req.query?.page || 1
        //const result = employeesController.giveEmployeesForPage(queryPage)
        res.status(200).json()
    })
    router.get('/:id', (req, res) => {
        const params = req.params.id
        // const result = employeesController.giveEmployeesById(params)
        res.status(200).json()
    })
    return router
}