/*
  Warnings:

  - You are about to drop the column `favicon` on the `Link` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LinkStatus" AS ENUM ('PENDING', 'VERIFIED', 'DANGEROUS');

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "favicon",
ADD COLUMN     "status" "LinkStatus" NOT NULL DEFAULT 'PENDING';
