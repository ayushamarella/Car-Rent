import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import md5 from "md5";

const prisma = new PrismaClient()

const createAdmin = async (request: Request, response: Response) => {
    try {
        const nama_admin = request.body.nama_admin
        const email = request.body.email
        const password = md5(request.body.password)

        const newData = await prisma.admin.create({
            data: {
                nama_admin: nama_admin,
                email: email,
                password: password
            }
        })

        return response.status(200).json({
            status: true,
            message: `Admin has been created`,
            data: newData
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const readAdmin = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const quantity = Number(request.query.quantity) || 10;
        const keyword = request.query.keyword?.toString() || "";
        const dataAdmin = await prisma.admin.findMany({
            take: quantity, 
            skip: (page - 1) * quantity,
            where: {
                OR: [
                   {nama_admin: { contains: keyword}},
                   {email: { contains: keyword}},
                ]
            },
            orderBy: {nama_admin: "asc"}
        })
        return response
            .status(200)
            .json({
                status: true,
                message: `Admin has been loaded`,
                data: dataAdmin
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const updateAdmin = async (request: Request, response: Response) => {
    try {
        const ID_Admin = request.params.ID_Admin
        const nama_admin = request.body.nama_admin
        const email = request.body.email
        const password = request.body.password

        const findAdmin = await prisma.admin.findFirst({
            where: { ID: Number(ID_Admin) }
        })

        if (!findAdmin) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data Admin not found`
                })
        }

        const dataAdmin = await prisma.admin.update({
            where: { ID: Number(ID_Admin) },
            data: {
                nama_admin: nama_admin || findAdmin.nama_admin,
                email: email || findAdmin.email,
                password: password || findAdmin.password

            }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Admin has been updated`,
                data: dataAdmin
            })

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const deleteAdmin = async (request: Request, response: Response) => {
    try {
        const ID_Admin = request.params.eventID

        const findAdmin = await prisma.admin.findFirst({
            where: { ID: Number(ID_Admin) }
        })

        if(!findAdmin){
            return response.status(400)
            .json({
               status: false,
               message: `Admin not found`
            })
        }

        const dataAdmin = await prisma.admin.delete({
            where: {ID: Number(ID_Admin)} 
        })

        return response.status(200)
        .json({
            status: true,
            message: `Data Admin has been deleted`
        })

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const login = async (request: Request, response: Response) => {
    try {
        const email = request.body.email
        const password = md5(request.body.password)
        const admin = await prisma.admin.findFirst(
            {
                where: { 
                    email: email, password: password
                }
            }
        )

        if (admin) {
            const payload = admin
            const secretkey = "284core"
            const token = sign(payload, secretkey)
            return response.status(200).json({
                status: true,
                message: `login berhasil`,
                token: token
            })
        }

        else {
            return response.status(200).json({
                status: false,
                message: `login gagal`
            })
        }

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }

}

export { createAdmin, readAdmin, updateAdmin, deleteAdmin, login }