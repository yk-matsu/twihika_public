/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "FirebaseUserProvider" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayName" TEXT,
    "email" TEXT NOT NULL,
    "firebaseUserId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "photoUrl" TEXT,
    "providerId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirebaseUserProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FirebaseUser" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customClaims" JSONB,
    "disabled" BOOLEAN,
    "displayName" TEXT,
    "email" TEXT,
    "emailVerified" BOOLEAN,
    "id" TEXT NOT NULL,
    "metadata" JSONB,
    "multiFactor" JSONB,
    "phoneNumber" TEXT,
    "photoUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirebaseUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FirebaseUserProvider" ADD CONSTRAINT "FirebaseUserProvider_firebaseUserId_fkey" FOREIGN KEY ("firebaseUserId") REFERENCES "FirebaseUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
