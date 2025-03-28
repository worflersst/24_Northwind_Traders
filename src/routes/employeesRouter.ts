import express from "express";
import {employeesController} from "../controllers/employeesController";


export const employeesRouter =  () => {
    const router = express.Router()
    router.get('/', async (req, res) => {
        const queryPage = req.query?.page ? Number(req.query.page) : 1;
        const result = await employeesController.getEmployeesForPage(queryPage)
        res.status(200).json(result)
    })
    router.get('/:id', async (req, res) => {
        const id = Number(req.params.id)
         const result = await employeesController.getEmployeesById(id)
        res.status(200).json(result)
    })
    return router
}