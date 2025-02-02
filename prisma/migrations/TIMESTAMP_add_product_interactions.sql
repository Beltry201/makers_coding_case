-- Add ProductInteraction model
CREATE TABLE "ProductInteraction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductInteraction_pkey" PRIMARY KEY ("id")
);

-- Add popularity field to Product
ALTER TABLE "Product" ADD COLUMN "popularity" FLOAT NOT NULL DEFAULT 0;

-- Create indexes
CREATE INDEX "ProductInteraction_userId_idx" ON "ProductInteraction"("userId");
CREATE INDEX "ProductInteraction_productId_idx" ON "ProductInteraction"("productId");

-- Add foreign key constraints
ALTER TABLE "ProductInteraction" ADD CONSTRAINT "ProductInteraction_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ProductInteraction" ADD CONSTRAINT "ProductInteraction_productId_fkey" 
    FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE; 