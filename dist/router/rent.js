"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rent_1 = require("../controller/rent");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post(`/rent`, rent_1.createRent);
app.get(`/rent`, rent_1.readRent);
app.put(`/rent`, rent_1.updateRent);
app.delete(`/rent`, rent_1.deleteRent);
exports.default = app;
