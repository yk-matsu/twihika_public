/*
  Warnings:

  - You are about to drop the `FirebaseUserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
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

-- DropTable
DROP TABLE "FirebaseUserRole";

-- DropTable
DROP TABLE "UserRole";

-- DropTable
DROP TABLE "_FirebaseUserRoleToUserRole";

-- DropTable
DROP TABLE "_FirebaseUserToFirebaseUserRole";
