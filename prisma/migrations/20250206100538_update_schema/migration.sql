-- CreateIndex
CREATE INDEX "Booking_userId_propertyId_idx" ON "Booking"("userId", "propertyId");

-- CreateIndex
CREATE INDEX "Host_userId_idx" ON "Host"("userId");

-- CreateIndex
CREATE INDEX "Property_hostId_idx" ON "Property"("hostId");

-- CreateIndex
CREATE INDEX "Review_propertyId_userId_idx" ON "Review"("propertyId", "userId");
