/*
  Warnings:

  - You are about to drop the column `age` on the `dog` table. All the data in the column will be lost.
  - Added the required column `description` to the `dog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dogAdopteeId` to the `dog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dogId` to the `dog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dogOwnerId` to the `dog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `dog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `dog` table without a default value. This is not possible if the table is not empty.
  - Made the column `color` on table `dog` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `gender` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearBorn` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `dog` DROP COLUMN `age`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `disability` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `dogAdopteeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `dogId` VARCHAR(191) NOT NULL,
    ADD COLUMN `dogOwnerId` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    ADD COLUMN `status` ENUM('AVAILABLE', 'PENDING', 'ADOPTED') NOT NULL,
    MODIFY `image` VARCHAR(191) NULL,
    MODIFY `color` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    ADD COLUMN `phoneNumber` INTEGER NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD COLUMN `yearBorn` INTEGER NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `adoption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adoptionId` VARCHAR(191) NOT NULL,
    `dogId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'ACCEPTED', 'REJECTED', 'DECLINED') NOT NULL,
    `adopteeUserId` VARCHAR(191) NOT NULL,
    `dogOwnerUserId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
