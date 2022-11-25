import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser"

//Import Routes
import routes from "./routes/index"

const app = express()
//Required Middle Wares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(cookieParser())

//DB connection
import "./config/db_setup"

//Bussiness Routers middle wares
app.use("/api/v1/auth", routes.authrouter)


//Server
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server runs at port: ${port}...`)
})

