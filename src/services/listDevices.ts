import { PrismaClient } from "@prisma/client";
import NotFoundError from "../exceptions/NotFoundError";

const prisma = new PrismaClient();

export const listAllDevices = async () => {
  const devices = await prisma.device.findMany({
    orderBy: {
      id: "asc",
    },
  });

  if (devices.length === 0) {
    throw new NotFoundError("Devices not found");
  }

  return devices;
};
