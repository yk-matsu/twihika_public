-- CreateTable
CREATE TABLE "FirebaseUserTweetDrilledDown" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firebaseUserId" TEXT,
    "id" TEXT NOT NULL,
    "tweetId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirebaseUserTweetDrilledDown_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FirebaseUserTweetDrilledDown" ADD CONSTRAINT "FirebaseUserTweetDrilledDown_firebaseUserId_fkey" FOREIGN KEY ("firebaseUserId") REFERENCES "FirebaseUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
