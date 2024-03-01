"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("./router/admin"));
const car_1 = __importDefault(require("./router/car"));
const rent_1 = __importDefault(require("./router/rent"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 8001;
app.use(admin_1.default, car_1.default, rent_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
