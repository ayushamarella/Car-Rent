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
exports.deleteRent = exports.updateRent = exports.readRent = exports.createRent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createRent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_Car = Number(request.body.ID_Car);
        const nama_penyewa = request.body.nama_penyewa;
        const tanggal = new Date(request.body.tanggal).toISOString();
        const lama_sewa = request.body.lama_sewa;
        const total_bayar = Number(request.body.total_bayar);
        const newData = yield prisma.rent.create({
            data: {
                ID_Car: ID_Car,
                nama_penyewa: nama_penyewa,
                tanggal: tanggal,
                lama_sewa: lama_sewa,
                total_bayar: total_bayar
            }
        });
        return response
            .status(200)
            .json({
            status: true,
            message: `Rent has been created`,
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
exports.createRent = createRent;
const readRent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const page = Number(request.query.page) || 1;
        const quantity = Number(request.query.quantity) || 5;
        const keyword = ((_a = request.query.keyword) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        const dataRent = yield prisma.rent.findMany({
            take: quantity,
            skip: (page - 1) * quantity,
            where: {
                OR: [
                    { nama_penyewa: { contains: keyword } },
                    { lama_sewa: { contains: keyword } },
                ]
            },
            orderBy: { nama_penyewa: "asc" }
        });
        return response
            .status(200)
            .json({
            status: true,
            message: `rent has been loaded`,
            data: dataRent
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
exports.readRent = readRent;
const updateRent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_Rent = request.params.ID_Rent;
        const ID_Car = request.body.ID_Car;
        const nama_penyewa = request.body.nama_penyewa;
        const tanggal = new Date(request.body.tanggal).toISOString();
        const lama_sewa = request.body.lama_sewa;
        const total_bayar = Number(request.body.total_bayar);
        const findRent = yield prisma.rent.findFirst({
            where: { ID_Rent: Number(ID_Rent) }
        });
        if (!findRent) {
            return response.status(400)
                .json({
                status: false,
                message: `Data rent not found`
            });
        }
        const dataRent = yield prisma.rent.update({
            where: { ID_Rent: Number(ID_Rent) },
            data: {
                ID_Car: ID_Car || findRent.ID_Car,
                nama_penyewa: nama_penyewa || findRent.nama_penyewa,
                tanggal: tanggal || findRent.tanggal,
                lama_sewa: lama_sewa || findRent.lama_sewa,
                total_bayar: total_bayar || findRent.total_bayar
            }
        });
        return response.status(200)
            .json({
            status: true,
            message: `Rent has been updated`,
            data: dataRent
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
exports.updateRent = updateRent;
const deleteRent = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_Rent = request.params.ID_Rent;
        const findRent = yield prisma.rent.findFirst({
            where: { ID_Car: Number(ID_Rent) }
        });
        if (!findRent) {
            return response.status(400)
                .json({
                status: false,
                message: `Rent not found`
            });
        }
        const dataRent = yield prisma.rent.delete({
            where: { ID_Rent: Number(ID_Rent) }
        });
        return response.status(200)
            .json({
            status: true,
            message: `Data rent has been deleted`
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
exports.deleteRent = deleteRent;
