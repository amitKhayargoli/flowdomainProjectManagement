/*
  Warnings:

  - Made the column `status` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dueDate` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectManagerUserId` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_projectManagerUserId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "coverURL" TEXT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'To do',
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "dueDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "projectManagerUserId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_projectManagerUserId_fkey" FOREIGN KEY ("projectManagerUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
