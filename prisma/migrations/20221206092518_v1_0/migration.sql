-- CreateTable
CREATE TABLE "mailauditlogs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sent" INTEGER NOT NULL DEFAULT 0,
    "open" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "mailauditlogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mailauditlogs" ADD CONSTRAINT "mailauditlogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
