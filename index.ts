import {runDB} from "./src/db/connectsToTheDB/postgresqlConnect";
import {app} from "./app";
const PORT = 3010

const runApp = async (ports: number) => {
    await runDB()
    app.listen(ports, async () => {
        console.log(`Example app listening on port ${PORT}`)
    })
}

runApp(PORT)

