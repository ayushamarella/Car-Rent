"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controller/admin");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post(`/admin`, admin_1.createAdmin);
app.get(`/admin`, admin_1.readAdmin);
app.put(`/admin`, admin_1.updateAdmin);
app.delete(`/admin`, admin_1.deleteAdmin);
exports.default = app;
