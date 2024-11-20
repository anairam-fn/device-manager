import { PrismaClient } from '@prisma/client';
import { getDeviceById } from '../../../src/services/index';

const prisma = new PrismaClient();

describe('getDeviceById', () => {
  let deviceId1: number;

  beforeEach(async () => {
    await prisma.device.deleteMany({});

    const device1 = await prisma.device.create({ data: { name: 'Device1', brand: 'BrandA' } });
    await prisma.device.create({ data: { name: 'Device2', brand: 'BrandA' } });
    await prisma.device.create({ data: { name: 'Device3', brand: 'BrandB' } });

    deviceId1 = device1.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return the device with the specified ID', async () => {
    const device = await getDeviceById(deviceId1);
    expect(device).toEqual(expect.objectContaining({ id: deviceId1, name: 'Device1', brand: 'BrandA' }));
  });

  it('should throw an error if no device is found with the specified ID', async () => {
    const nonExistentId = 9999;
    await expect(getDeviceById(nonExistentId)).rejects.toThrow(`No device found for id ${nonExistentId}`);
  });
});
