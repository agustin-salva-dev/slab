-- DropIndex
DROP INDEX "Click_linkId_idx";

-- CreateIndex
CREATE INDEX "Click_linkId_timestamp_idx" ON "Click"("linkId", "timestamp");

-- CreateIndex
CREATE INDEX "Click_linkId_device_idx" ON "Click"("linkId", "device");

-- CreateIndex
CREATE INDEX "Click_linkId_country_idx" ON "Click"("linkId", "country");
