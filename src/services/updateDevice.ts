import { PrismaClient } from "@prisma/client";
import NotFoundError from "../exceptions/NotFoundError";

const prisma = new PrismaClient();

import { Device } from "@prisma/client";

export const updateDevice = async (id: number, data: Partial<Device>) => {
  try {
    const updatedDevice = await prisma.device.update({
      where: {
        id,
      },
      data,
    })
  
    return updatedDevice;
  } catch (error: any | unknown) {
    if (error.code === 'P2025') {
      throw new NotFoundError('Device not found for update');
    }
  }
};