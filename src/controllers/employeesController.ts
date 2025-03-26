import {EmployeeI} from "../db/parseCsvData/parseLogic/employeesParse";

export const employeesController = {
    async getEmployeesForPage(queryPage: string) {
        // Promise<EmployeeI[]>
        // return await employeesRepository.getEmployeesForPage(queryPage)
    },
    async getEmployeesById(id: string) {
        // Promise<EmployeeI>
        // return await employeesRepository.getEmployeesById(id)
    }
}