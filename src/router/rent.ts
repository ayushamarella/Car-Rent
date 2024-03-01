import express from "express";
import { createRent, deleteRent, readRent, updateRent } from "../controller/rent";

const app = express()

app.use(express.json())

app.post(`/rent`, createRent)
app.get(`/rent`, readRent)
app.put(`/rent/:ID_Rent`, updateRent)
app.delete(`/rent/:ID_Rent`, deleteRent)

export default app