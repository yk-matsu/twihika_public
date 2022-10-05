-- CreateTable
CREATE TABLE "FirebaseUserRole" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "role" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirebaseUserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FirebaseUserToFirebaseUserRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FirebaseUserRoleToUserRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FirebaseUserToFirebaseUserRole_AB_unique" ON "_FirebaseUserToFirebaseUserRole"("A", "B");

-- CreateIndex
CREATE INDEX "_FirebaseUserToFirebaseUserRole_B_index" ON "_FirebaseUserToFirebaseUserRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FirebaseUserRoleToUserRole_AB_unique" ON "_FirebaseUserRoleToUserRole"("A", "B");

-- CreateIndex
CREATE INDEX "_FirebaseUserRoleToUserRole_B_index" ON "_FirebaseUserRoleToUserRole"("B");

-- AddForeignKey
ALTER TABLE "_FirebaseUserToFirebaseUserRole" ADD CONSTRAINT "_FirebaseUserToFirebaseUserRole_A_fkey" FOREIGN KEY ("A") REFERENCES "FirebaseUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FirebaseUserToFirebaseUserRole" ADD CONSTRAINT "_FirebaseUserToFirebaseUserRole_B_fkey" FOREIGN KEY ("B") REFERENCES "FirebaseUserRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FirebaseUserRoleToUserRole" ADD CONSTRAINT "_FirebaseUserRoleToUserRole_A_fkey" FOREIGN KEY ("A") REFERENCES "FirebaseUserRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FirebaseUserRoleToUserRole" ADD CONSTRAINT "_FirebaseUserRoleToUserRole_B_fkey" FOREIGN KEY ("B") REFERENCES "UserRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
