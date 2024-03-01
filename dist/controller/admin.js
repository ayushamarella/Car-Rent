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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteAdmin = exports.updateAdmin = exports.readAdmin = exports.createAdmin = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const md5_1 = __importDefault(require("md5"));
const prisma = new client_1.PrismaClient();
const createAdmin = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nama_admin = request.body.nama_admin;
        const email = request.body.email;
        const password = request.body.password;
        const newData = yield prisma.admin.create({
            data: {
                nama_admin: nama_admin,
                email: email,
                password: password
            }
        });
        return response.status(200).json({
            status: true,
            message: `Admin has been created`,
            data: newData
        });
    }
    catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        });
    }
});
exports.createAdmin = createAdmin;
const readAdmin = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const page = Number(request.query.page) || 1;
        const quantity = Number(request.query.quantity) || 10;
        const keyword = ((_a = request.query.keyword) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        const dataAdmin = yield prisma.admin.findMany({
            take: quantity,
            skip: (page - 1) * quantity,
            where: {
                OR: [
                    { nama_admin: { contains: keyword } },
                    { email: { contains: keyword } },
                ]
            },
            orderBy: { nama_admin: "asc" }
        });
        return response
            .status(200)
            .json({
            status: true,
            message: `Admin has been loaded`,
            data: dataAdmin
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
exports.readAdmin = readAdmin;
const updateAdmin = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_Admin = request.params.ID_Admin;
        const nama_admin = request.body.nama_admin;
        const email = request.body.email;
        const password = request.body.password;
        const findAdmin = yield prisma.admin.findFirst({
            where: { ID: Number(ID_Admin) }
        });
        if (!findAdmin) {
            return response.status(400)
                .json({
                status: false,
                message: `Data Admin not found`
            });
        }
        const dataAdmin = yield prisma.admin.update({
            where: { ID: Number(ID_Admin) },
            data: {
                nama_admin: nama_admin || findAdmin.nama_admin,
                email: email || findAdmin.email,
                password: password || findAdmin.password
            }
        });
        return response.status(200)
            .json({
            status: true,
            message: `Admin has been updated`,
            data: dataAdmin
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
exports.updateAdmin = updateAdmin;
const deleteAdmin = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_Admin = request.params.eventID;
        const findAdmin = yield prisma.admin.findFirst({
            where: { ID: Number(ID_Admin) }
        });
        if (!findAdmin) {
            return response.status(400)
                .json({
                status: false,
                message: `Admin not found`
            });
        }
        const dataAdmin = yield prisma.admin.delete({
            where: { ID: Number(ID_Admin) }
        });
        return response.status(200)
            .json({
            status: true,
            message: `Data Admin has been deleted`
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
exports.deleteAdmin = deleteAdmin;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = request.body.email;
        const password = (0, md5_1.default)(request.body.password);
        const admin = yield prisma.admin.findFirst({
            where: {
                email: email, password: password
            }
        });
        if (admin) {
            const payload = admin;
            const secretkey = "284core";
            const token = (0, jsonwebtoken_1.sign)(payload, secretkey);
            return response.status(200).json({
                status: true,
                message: `login berhasil`,
                token: token
            });
        }
        else {
            return response.status(200).json({
                status: false,
                message: `login gagal`
            });
        }
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
exports.login = login;
