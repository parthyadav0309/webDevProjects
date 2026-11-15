-- CreateTable
CREATE TABLE "CareerPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "advice" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CareerPlan_userId_createdAt_idx" ON "CareerPlan"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "CareerPlan" ADD CONSTRAINT "CareerPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
