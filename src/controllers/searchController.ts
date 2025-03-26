import {ProductI} from "../db/parseCsvData/parseLogic/productsParse";
import {CustomerI} from "../db/parseCsvData/parseLogic/customersParse";

export const searchController = {
    async getObjectsByArguments(whatSearch: string, tableName: string, limitReturnObj: string) {
        // Promise<ProductI[] || CustomerI[] >
        // return await searchRepository.getObjectsByArguments(whatSearch, tableName, limitReturnObj )
    }
}