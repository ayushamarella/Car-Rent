import express from "express";
import { createCar, deleteCar, readCar, updateCar } from "../controller/car";

const app = express()

app.use(express.json())

app.post(`/car`, createCar)
app.get(`/car`, readCar)
app.put(`/car/:ID_Car`, updateCar)
app.delete(`/car/:ID_Car`, deleteCar)

export default app