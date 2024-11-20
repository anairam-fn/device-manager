import { PrismaClient } from '@prisma/client';
import { createDevice } from '../../../src/services/createDevice';

const prisma = new PrismaClient();

describe('createDevice', () => {
  beforeEach(async () => {
    await prisma.device.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const deviceData = { name: 'Device1', brand: 'BrandA' };

  it('should create a device successfully', async () => {
    const device = await createDevice(deviceData);
    expect(device).toHaveProperty('id');
    expect(device).toHaveProperty('name', deviceData.name);
    expect(device).toHaveProperty('brand', deviceData.brand);
  });

  it('should throw an error if a device with the same name and brand already exists', async () => {
    await createDevice(deviceData);
    await expect(createDevice(deviceData)).rejects.toThrow('A device with the same name and brand already exists');
  });

  it('should throw an error if name is missing', async () => {
    const invalidDeviceData = { brand: 'BrandA' };
    await expect(createDevice(invalidDeviceData as any)).rejects.toThrow();
  });

  it('should throw an error if brand is missing', async () => {
    const invalidDeviceData = { name: 'Device1' };
    await expect(createDevice(invalidDeviceData as any)).rejects.toThrow();
  });
});
