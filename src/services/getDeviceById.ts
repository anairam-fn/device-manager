import { PrismaClient } from "@prisma/client";
import NotFoundError from "../exceptions/NotFoundError";

const prisma = new PrismaClient();

export const getDeviceById = async (id: number) => {
  const device = await prisma.device.findUnique({
    where: {
      id: id,
    },
  });

  if (!device) {
    throw new NotFoundError(`No device found for id ${id}`);
  }

  return device;
};
