import {suppliersRepository} from "../repository/suppliersRepository";

export const suppliersController = {
    async getSuppliersForPage(queryPage: number) {
         return await suppliersRepository.getSuppliersForPage(queryPage)
    },
    async getSupplierById(id: number) {
         return await suppliersRepository.getSupplierById(id)
    }
}