import {searchRepository} from "../repository/searchRepository";

export const searchController = {
    async getObjectsByArguments(whatSearch: string, tableName: string, limit: number) {
        return await searchRepository.getObjectsByArguments(whatSearch, tableName, limit )
    }
}