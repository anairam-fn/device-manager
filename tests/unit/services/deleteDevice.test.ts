import { PrismaClient } from '@prisma/client';
import { deleteDevice } from '../../../src/services/index';

const prisma = new PrismaClient();

describe('deleteDevice', () => {
  beforeEach(async () => {
    await prisma.device.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const deviceData = { name: 'Device1', brand: 'BrandA' };

  it('should delete a device successfully', async () => {
    const device = await prisma.device.create({ data: deviceData });
    await deleteDevice(device.id);
    const deletedDevice = await prisma.device.findUnique({ where: { id: device.id } });
    expect(deletedDevice).toBeNull();
  });

  it('should throw an error if the device does not exist', async () => {
    await expect(deleteDevice(1)).rejects.toThrow('Device not found for deletion');
  });
});
