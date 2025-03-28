import express from "express";
import cors from "cors";
import {suppliersRouter} from "./src/routes/suppliersRouter";
import {productsRouter} from "./src/routes/productsRouter";
import {ordersRouter} from "./src/routes/ordersRouter";
import {employeesRouter} from "./src/routes/employeesRouter";
import {customersRouter} from "./src/routes/customersRouter";
import {searchRouter} from "./src/routes/searchRouter";

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/suppliers', suppliersRouter())
app.use('/products', productsRouter())
app.use('/orders', ordersRouter())
app.use('/employees', employeesRouter())
app.use('/customers', customersRouter())
app.use('/search', searchRouter())