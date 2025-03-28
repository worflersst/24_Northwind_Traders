import {ordersRepository} from "../repository/ordersRepository";

export const ordersController = {
    async getOrdersForPage(queryPage: number) {
        return await ordersRepository.getOrdersForPage(queryPage)
    },
    async getOrdersById(id: number) {
         return await ordersRepository.getOrdersAndProductById(id)
    }
}