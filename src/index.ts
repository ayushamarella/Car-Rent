import express from "express"
import Admin from "./router/admin"
import Car from "./router/car"
import Rent from "./router/rent"

const app = express()

app.use(express.json())

const PORT = 8001

app.use(Admin, Car, Rent)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})