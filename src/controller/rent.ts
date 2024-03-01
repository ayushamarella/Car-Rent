import { PrismaClient } from "@prisma/client"
import { Request, Response, request, response } from "express"

const prisma = new PrismaClient()

const createRent = async (request: Request, response: Response) => {
    try {
        const ID_Car = Number(request.body.ID_Car)
        const nama_penyewa = request.body.nama_penyewa
        const tanggal = new Date(request.body.tanggal).toISOString()
        const lama_sewa = Number(request.body.lama_sewa)

        const car = await prisma.car.findFirst({ where: { ID_Car: Number(ID_Car) } })
        if (!car) {
            return response.status(400).json({
                status: false,
                message: `Data car not found`
            })
        }
        const total_bayar = car.harga_perhari * lama_sewa

        const newData = await prisma.rent.create({
            data: {
                ID_Car: ID_Car,
                nama_penyewa: nama_penyewa,
                tanggal: tanggal,
                lama_sewa: lama_sewa,
                total_bayar: total_bayar
            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: `Rent has been created`,
                data: newData
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


const readRent = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const quantity = Number(request.query.quantity) || 5;
        const keyword = request.query.keyword?.toString() || "";
        const dataRent = await prisma.rent.findMany({
            take: quantity, 
            skip: (page - 1) * quantity,
            where: {
                OR: [
                   {nama_penyewa: { contains: keyword}}
                ]
            },
            orderBy: {nama_penyewa: "asc"}
        })
        return response
            .status(200)
            .json({
                status: true,
                message: `rent has been loaded`,
                data: dataRent
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

const updateRent = async (request: Request, response: Response) => {
    try {
        const ID_Rent = Number(request.params.ID_Rent)
        const ID_Car = Number(request.body.ID_Car)
        const nama_penyewa = request.body.nama_penyewa
        const tanggal = new Date(request.body.tanggal).toISOString()
        const lama_sewa = Number(request.body.lama_sewa)

        const car = await prisma.car.findFirst({ where: { ID_Car: Number(ID_Car) } })
        if (!car) {
            return response.status(400).json({
                status: false,
                message: `Data car not found`
            })
        }
        const total_bayar = car.harga_perhari * lama_sewa

        const findRent = await prisma.rent.findFirst({
            where: { ID_Rent: Number(ID_Rent) }
        })

        if (!findRent) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data rent not found`
                })
        }

        const dataRent = await prisma.rent.update({
            where: { ID_Rent: Number(ID_Rent) },
            data: {
                ID_Car: ID_Car || findRent.ID_Car,
                nama_penyewa: nama_penyewa || findRent.nama_penyewa,
                tanggal: tanggal || findRent.tanggal,
                lama_sewa: lama_sewa || findRent.lama_sewa,
                total_bayar: total_bayar || findRent.total_bayar
            }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Rent has been updated`,
                data: dataRent
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


const deleteRent = async (request: Request, response: Response) => {
    try {
        const ID_Rent = request.params.ID_Rent
 
        const findRent = await prisma.rent.findFirst({
            where: { ID_Rent: Number(ID_Rent) }
        })

        if (!findRent) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Rent not found`
                })
        }

        const dataRent = await prisma.rent.delete({
            where: { ID_Rent: Number(ID_Rent) }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Data rent has been deleted`
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

export { createRent, readRent, updateRent, deleteRent }