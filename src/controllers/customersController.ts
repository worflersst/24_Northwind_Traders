import {CustomerI} from "../db/parseCsvData/parseLogic/customersParse";

export const customersController = {
    async getCustomersForPage(queryPage: string) {
        // Promise<CustomerI[]>
        // return await customersRepository.getСustomersForPage(queryPage)
    },
    async getCustomersById(id: string) {
        // Promise<CustomerI>
        // return await customersRepository.getCustomerById(id)
    }
}

