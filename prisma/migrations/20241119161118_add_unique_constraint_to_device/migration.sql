/*
  Warnings:

  - A unique constraint covering the columns `[name,brand]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Device_name_brand_key" ON "Device"("name", "brand");
