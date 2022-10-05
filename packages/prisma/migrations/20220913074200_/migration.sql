-- CreateTable
CREATE TABLE "TwitterBotUser" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwitterBotUser_pkey" PRIMARY KEY ("id")
);
