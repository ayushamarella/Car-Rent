import { PrismaClient } from "@prisma/client"
import { Request, Response, request, response } from "express"

const prisma = new PrismaClient()

const createCar = async (request: Request, response: Response) => {
    try {
        const nopol = request.body.nopol
        const merk_mobil = request.body.merk_mobil
        const harga_perhari = Number(request.body.harga_perhari)

        const newData = await prisma.car.create({
            data: {
                nopol: nopol,
                merk_mobil: merk_mobil,
                harga_perhari: harga_perhari

            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: `car has been created`,
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


const readCar = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) || 1;
        const quantity = Number(request.query.quantity) || 5;
        const keyword = request.query.keyword?.toString() || "";
        const dataCar = await prisma.car.findMany({
            take: quantity, 
            skip: (page - 1) * quantity,
            where: {
                OR: [
                   {nopol: { contains: keyword}},
                   {merk_mobil: { contains: keyword}},
                ]
            },
            orderBy: {nopol: "asc"}
        })
        return response
            .status(200)
            .json({
                status: true,
                message: `car has been loaded`,
                data: dataCar
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

const updateCar = async (request: Request, response: Response) => {
    try {
        const ID_Car = request.params.ID_Car
        const nopol = request.body.nopol
        const merk_mobil = request.body.merk_mobil
        const harga_perhari = Number(request.body.harga_perhari)

        const findCar = await prisma.car.findFirst({
            where: { ID_Car: Number(ID_Car) }
        })

        if (!findCar) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Data car not found`
                })
        }

        const dataCar = await prisma.car.update({
            where: { ID_Car: Number(ID_Car) },
            data: {
                nopol: nopol || findCar.nopol,
                merk_mobil: merk_mobil || findCar.merk_mobil,
                harga_perhari: harga_perhari || findCar.harga_perhari 
            }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Car has been updated`,
                data: dataCar
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


const deleteCar = async (request: Request, response: Response) => {
    try {
        const ID_Car = request.params.ID_Car
 
        const findCar = await prisma.car.findFirst({
            where: { ID_Car: Number(ID_Car) }
        })

        if (!findCar) {
            return response.status(400)
                .json({
                    status: false,
                    message: `Car not found`
                })
        }

        const dataCar = await prisma.car.delete({
            where: { ID_Car: Number(ID_Car) }
        })

        return response.status(200)
            .json({
                status: true,
                message: `Data car has been deleted`
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

export { createCar, readCar, updateCar, deleteCar }