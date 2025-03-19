/*
  Warnings:

  - You are about to drop the column `assignedUserId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `authorUserId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assignedUserId",
DROP COLUMN "authorUserId",
DROP COLUMN "points";
