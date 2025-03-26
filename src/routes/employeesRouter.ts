import express from "express";
import {employeesController} from "../controllers/employeesController";


export const employeesRouter =  () => {
    const router = express.Router()
    router.get('/', (req, res) => {
        const queryPage = String(req.query?.page) || '1'
        const result = employeesController.getEmployeesForPage(queryPage)
        res.status(200).json(result)
    })
    router.get('/:id', (req, res) => {
        const id = req.params.id
         const result = employeesController.getEmployeesById(id)
        res.status(200).json(result)
    })
    return router
}