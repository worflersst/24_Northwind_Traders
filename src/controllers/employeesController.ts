import {employeesRepository} from "../repository/employeesRepository";

export const employeesController = {
    async getEmployeesForPage(queryPage: number) {
         return await employeesRepository.getEmployeesForPage(queryPage)
    },
    async getEmployeesById(id: number) {
         return await employeesRepository.getEmployeesById(id)
    }
}