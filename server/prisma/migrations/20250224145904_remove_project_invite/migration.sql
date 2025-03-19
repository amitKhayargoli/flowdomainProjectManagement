/*
  Warnings:

  - You are about to drop the `ProjectInvite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectInvite" DROP CONSTRAINT "ProjectInvite_projectId_fkey";

-- DropTable
DROP TABLE "ProjectInvite";
