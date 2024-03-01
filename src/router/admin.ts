import express from "express";
import { createAdmin, deleteAdmin, login, readAdmin, updateAdmin } from "../controller/admin";
import { verifyAdmin } from "../middleware/verifyAdmin";

const app = express()

app.use(express.json())

app.post(`/admin`, verifyAdmin, createAdmin)
app.get(`/admin`, verifyAdmin, readAdmin)
app.put(`/admin/:ID_Admin`, verifyAdmin, updateAdmin)
app.delete(`/admin/:ID_Admin`, verifyAdmin, deleteAdmin)
app.post(`/admin/login`, login)

export default app
