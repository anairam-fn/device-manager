import { PrismaClient } from '@prisma/client';
import NotFoundError from '../exceptions/NotFoundError';

const prisma = new PrismaClient();

export const deleteDevice = async (id: number) => {
  try {
    const device = await prisma.device.delete({
      where: { id },
    });

    return device;
  } catch (error: any | unknown) {
    if (error.code === 'P2025') {
      throw new NotFoundError('Device not found for deletion');
    }
  }
};
