import {orderI} from "../db/parseCsvData/parseLogic/ordersParse";

export const ordersController = {
    async getOrdersForPage(queryPage: string) {
        // Promise<orderI[]>
        // return await ordersRepository.getOrdersForPage(queryPage)
    },
    async getOrdersById(id: string) {
        // Promise<orderI>
        // return await ordersRepository.getOrdersById(id)
    }
}