import express from 'express'
import {categoriesParse} from "./src/db/parseCsvData/parseLogic/categoriesParse";
import {customersParse} from "./src/db/parseCsvData/parseLogic/customersParse";
import {employeesParse} from "./src/db/parseCsvData/parseLogic/employeesParse";
import {employeeTerritoriesParse} from "./src/db/parseCsvData/parseLogic/employeeTerritoriesParse";
import {orderDetailsParse} from "./src/db/parseCsvData/parseLogic/orderDetailsParse";
import {ordersParse} from "./src/db/parseCsvData/parseLogic/ordersParse";

const PORT = 3010
const app = express()

app.get('/', (req, res) => {
    //categoriesParse()
    //customersParse()
    //employeesParse()
    //employeeTerritoriesParse()
    //orderDetailsParse()
    //ordersParse()
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})