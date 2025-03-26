import {ProductI} from "../db/parseCsvData/parseLogic/productsParse";

export const productsController = {
    async getProductsForPage(queryPage: string) {
        // Promise<ProductI[]>
        // return await productsRepository.getProductsForPage(queryPage)
    },
    async getProductsById(id: string) {
        // Promise<ProductI>
        // return await productsRepository.getProductsById(id)
    }
}