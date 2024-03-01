"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_1 = require("../controller/car");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post(`/car`, car_1.createCar);
app.get(`/car`, car_1.readCar);
app.put(`/car`, car_1.updateCar);
app.delete(`/car`, car_1.deleteCar);
exports.default = app;
