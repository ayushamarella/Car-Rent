-- CreateTable
CREATE TABLE `Admin` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_admin` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `ID_Car` INTEGER NOT NULL AUTO_INCREMENT,
    `nopol` VARCHAR(191) NOT NULL DEFAULT '',
    `merk_mobil` VARCHAR(191) NOT NULL DEFAULT '',
    `harga_perhari` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID_Car`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rent` (
    `ID_Rent` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Car` INTEGER NOT NULL DEFAULT 0,
    `nama_penyewa` VARCHAR(191) NOT NULL DEFAULT '',
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lama_sewa` INTEGER NOT NULL DEFAULT 0,
    `total_bayar` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID_Rent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_ID_Car_fkey` FOREIGN KEY (`ID_Car`) REFERENCES `Car`(`ID_Car`) ON DELETE RESTRICT ON UPDATE CASCADE;