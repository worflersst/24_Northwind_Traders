import {productsRepository} from "../repository/productsRepository";

export const productsController = {
    async getProductsForPage(queryPage: number) {
         return await productsRepository.getProductsForPage(queryPage)
    },
    async getProductsById(id: number) {
         return await productsRepository.getProductsById(id)
    }
}