import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createDevice = async ({ name, brand }: { name: string; brand: string }) => {
  try {
    const device = await prisma.device.create({
      data: {
        name,
        brand,
      },
    });

    return device;
  } catch (error) {
    if ((error as any).code === 'P2002') {
      throw new Error('A device with the same name and brand already exists');
    }
    
    throw error;
  }
};