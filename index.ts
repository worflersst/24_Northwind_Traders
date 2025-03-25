import express from 'express'
import {categoriesParse} from "./src/db/parseCsvData/parseLogic/categoriesParse";
import {customersParse} from "./src/db/parseCsvData/parseLogic/customersParse";
import {employeesParse} from "./src/db/parseCsvData/parseLogic/employeesParse";
import {employeeTerritoriesParse} from "./src/db/parseCsvData/parseLogic/employeeTerritoriesParse";
import {orderDetailsParse} from "./src/db/parseCsvData/parseLogic/orderDetailsParse";
import {ordersParse} from "./src/db/parseCsvData/parseLogic/ordersParse";
import {productsParse} from "./src/db/parseCsvData/parseLogic/productsParse";
import {suppliesParse} from "./src/db/parseCsvData/parseLogic/suppliesParse";
import {regionsParse} from "./src/db/parseCsvData/parseLogic/regionsParse";
import {shippersParse} from "./src/db/parseCsvData/parseLogic/shippersParse";
import {territoriesParse} from "./src/db/parseCsvData/parseLogic/territoriesParse";
import {runDB} from "./src/db/connectsToTheDB/postgresqlConnect";

const PORT = 3010
const app = express()

app.get('/', (req, res) => {
    //categoriesParse()
    //customersParse()
    //employeesParse()
    //employeeTerritoriesParse()
    //orderDetailsParse()
    //ordersParse()
    //productsParse()
    //suppliesParse()
    //regionsParse()
    //shippersParse()
    //territoriesParse()
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
    runDB()
})