/*
  Warnings:

  - You are about to drop the `notifaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `notifaction`;

-- CreateTable
CREATE TABLE `notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notificationId` VARCHAR(191) NOT NULL,
    `status` ENUM('OPENED', 'PENDING') NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` ENUM('ADOPTION_DECLINED', 'ADOPTION_ACCEPTED', 'ADOPTION_INTERESTED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
