import {SupplierI} from "../db/parseCsvData/parseLogic/suppliesParse";

export const suppliersController = {
    async getSuppliersForPage(queryPage: string) {
        // Promise<SupplierI[]>
        // return await suppliersRepository.getSuppliersForPage(queryPage)
    },
    async getSupplierById(id: string) {
        // Promise<SupplierI>
        // return await suppliersRepository.getsupplierById(id)
    }
}