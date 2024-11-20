import { PrismaClient } from '@prisma/client';
import { listAllDevices } from '../../../src/services/index';

const prisma = new PrismaClient();

describe('listDevices', () => {
  beforeEach(async () => {
    await prisma.device.deleteMany({});

    await prisma.device.create({ data: { name: 'Device1', brand: 'BrandA' } });
    await prisma.device.create({ data: { name: 'Device2', brand: 'BrandA' } });
    await prisma.device.create({ data: { name: 'Device3', brand: 'BrandB' } });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return all devices', async () => {
    const devices = await listAllDevices();
    expect(devices).toHaveLength(3);
    expect(devices).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Device1', brand: 'BrandA' }),
        expect.objectContaining({ name: 'Device2', brand: 'BrandA' }),
        expect.objectContaining({ name: 'Device3', brand: 'BrandB' }),
      ])
    );
  });

  it('should return an empty array if no devices are found', async () => {
    await prisma.device.deleteMany({});

    expect(listAllDevices()).rejects.toThrow('Devices not found');
  });
});
