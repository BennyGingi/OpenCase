-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('fulfilled', 'shipped', 'awaiting_shipment');

-- CreateEnum
CREATE TYPE "PhoneModel" AS ENUM ('iphonex', 'iphonexs', 'iphonexsmax', 'iphonexr', 'iphone11', 'iphone11pro', 'iphone11promax', 'iphone12', 'iphone12mini', 'iphone12pro', 'iphone12promax', 'iphone13', 'iphone13mini', 'iphone13pro', 'iphone13promax', 'iphone14', 'iphone14plus', 'iphone14pro', 'iphone14promax', 'iphone15', 'iphone15plus', 'iphone15pro', 'iphone15promax');

-- CreateEnum
CREATE TYPE "CaseMaterial" AS ENUM ('silicone', 'polycarbonate', 'leather', 'tpu', 'metal', 'wood');

-- CreateEnum
CREATE TYPE "CaseFinish" AS ENUM ('smooth', 'textured', 'matte', 'glossy', 'carbonfiber', 'satin');

-- CreateEnum
CREATE TYPE "CaseColor" AS ENUM ('black', 'blue', 'rose', 'blue', 'yellow', 'purple', 'orange', 'teal', 'indigo', 'red', 'pink', 'cyan');

-- AlterTable
ALTER TABLE "Configuration" ADD COLUMN     "color" "CaseColor",
ADD COLUMN     "finish" "CaseFinish",
ADD COLUMN     "material" "CaseMaterial",
ADD COLUMN     "model" "PhoneModel";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "configurationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "status" "OrderStatus" NOT NULL DEFAULT 'awaiting_shipment',
    "shippingAddressId" TEXT,
    "billingAddressId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingAddress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "ShippingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingAddress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "BillingAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "ShippingAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "BillingAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
