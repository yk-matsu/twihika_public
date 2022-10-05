/*
  Warnings:

  - You are about to drop the column `role` on the `FirebaseUserRole` table. All the data in the column will be lost.
  - You are about to drop the `_FirebaseUserRoleToUserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FirebaseUserToFirebaseUserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FirebaseUserRoleToUserRole" DROP CONSTRAINT "_FirebaseUserRoleToUserRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_FirebaseUserRoleToUserRole" DROP CONSTRAINT "_FirebaseUserRoleToUserRole_B_fkey";

-- DropForeignKey
ALTER TABLE "_FirebaseUserToFirebaseUserRole" DROP CONSTRAINT "_FirebaseUserToFirebaseUserRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_FirebaseUserToFirebaseUserRole" DROP CONSTRAINT "_FirebaseUserToFirebaseUserRole_B_fkey";

-- AlterTable
ALTER TABLE "FirebaseUserRole" DROP COLUMN "role",
ADD COLUMN     "firebaseUserId" TEXT,
ADD COLUMN     "userRoleId" TEXT;

-- DropTable
DROP TABLE "_FirebaseUserRoleToUserRole";

-- DropTable
DROP TABLE "_FirebaseUserToFirebaseUserRole";

-- AddForeignKey
ALTER TABLE "FirebaseUserRole" ADD CONSTRAINT "FirebaseUserRole_firebaseUserId_fkey" FOREIGN KEY ("firebaseUserId") REFERENCES "FirebaseUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirebaseUserRole" ADD CONSTRAINT "FirebaseUserRole_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;
