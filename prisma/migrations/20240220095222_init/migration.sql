/*
  Warnings:

  - Added the required column `name` to the `dog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dog` ADD COLUMN `name` VARCHAR(191) NOT NULL;
