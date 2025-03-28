import {customersRepository} from "../repository/customersRepository";

export const customersController = {
    async getCustomersForPage(queryPage: number) {
        return await customersRepository.getСustomersForPage(queryPage)
    },
    async getCustomersById(id: string) {
         return await customersRepository.getCustomerById(id)
    }
}

