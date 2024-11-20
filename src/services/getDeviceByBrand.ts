import { PrismaClient } from "@prisma/client";
import NotFoundError from "../exceptions/NotFoundError";

const prisma = new PrismaClient();

export const getDeviceByBrand = async (brand: string) => {
  const devices = await prisma.device.findMany({
    where: {
      brand,
    },
  });

  if (devices.length === 0) {
    throw new NotFoundError("No devices found for the given brand");
  }

  return devices;
};
