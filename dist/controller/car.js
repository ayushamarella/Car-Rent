"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.readCar = exports.createCar = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCar = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_Car = Number(request.body.ID_Car);
        const nopol = request.body.nopol;
        const merk_mobil = request.body.merk_mobil;
        const harga_perhari = Number(request.body.harga_perhari);
        const newData = yield prisma.car.create({
            data: {
                ID_Car: ID_Car,
                nopol: nopol,
                merk_mobil: merk_mobil,
                harga_perhari: harga_perhari
            }
        });
        return response
            .status(200)
            .json({
            status: true,
            message: `car has been created`,
            data: newData
        });
    }
    catch (error) {
        return response
            .status(500)
            .json({
            status: false,
            message: error
        });
    }
});
exports.createCar = createCar;
const readCar = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const page = Number(request.query.page) || 1;
        const quantity = Number(request.query.quantity) || 5;
        const keyword = ((_a = request.query.keyword) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        const dataCar = yield prisma.car.findMany({
            take: quantity,
            skip: (page - 1) * quantity,
            where: {
                OR: [
                    { nopol: { contains: keyword } },
                    { merk_mobil: { contains: keyword } },
                ]
            },
            orderBy: { nopol: "asc" }
        });
        return response
            .status(200)
            .json({
            status: true,
            message: `car has been loaded`,
            data: dataCar
        });
    }
    catch (error) {
        return response
            .status(500)
            .json({
            status: false,
            message: error
        });
    }
});
exports.readCar = readCar;
const updateCar = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_Car = request.params.ID_Car;
        const nopol = request.body.nopol;
        const merk_mobil = request.body.merk_mobil;
        const harga_perhari = Number(request.body.harga_perhari);
        const findCar = yield prisma.car.findFirst({
            where: { ID_Car: Number(ID_Car) }
        });
        if (!findCar) {
            return response.status(400)
                .json({
                status: false,
                message: `Data car not found`
            });
        }
        const dataCar = yield prisma.car.update({
            where: { ID_Car: Number(ID_Car) },
            data: {
                nopol: nopol || findCar.nopol,
                merk_mobil: merk_mobil || findCar.merk_mobil,
                harga_perhari: harga_perhari || findCar.harga_perhari
            }
        });
        return response.status(200)
            .json({
            status: true,
            message: `Car has been updated`,
            data: dataCar
        });
    }
    catch (error) {
        return response
            .status(500)
            .json({
            status: false,
            message: error
        });
    }
});
exports.updateCar = updateCar;
const deleteCar = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_Car = request.params.ID_Car;
        const findCar = yield prisma.car.findFirst({
            where: { ID_Car: Number(ID_Car) }
        });
        if (!findCar) {
            return response.status(400)
                .json({
                status: false,
                message: `Car not found`
            });
        }
        const dataCar = yield prisma.car.delete({
            where: { ID_Car: Number(ID_Car) }
        });
        return response.status(200)
            .json({
            status: true,
            message: `Data car has been deleted`
        });
    }
    catch (error) {
        return response
            .status(500)
            .json({
            status: false,
            message: error
        });
    }
});
exports.deleteCar = deleteCar;
