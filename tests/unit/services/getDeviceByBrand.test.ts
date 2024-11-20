import { PrismaClient } from '@prisma/client';
import { getDeviceByBrand } from '../../../src/services/index';

const prisma = new PrismaClient();

describe('getDeviceByBrand', () => {
  beforeEach(async () => {
    await prisma.device.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const deviceData1 = { name: 'Device1', brand: 'BrandA' };
  const deviceData2 = { name: 'Device2', brand: 'BrandA' };
  const deviceData3 = { name: 'Device3', brand: 'BrandB' };

  beforeEach(async () => {
    await prisma.device.create({ data: deviceData1 });
    await prisma.device.create({ data: deviceData2 });
    await prisma.device.create({ data: deviceData3 });
  });

  it('should return devices of the specified brand', async () => {
    const devices = await getDeviceByBrand('BrandA');
    expect(devices).toHaveLength(2);
    expect(devices).toEqual(
      expect.arrayContaining([
        expect.objectContaining(deviceData1),
        expect.objectContaining(deviceData2),
      ])
    );
  });

  it('should return an empty array if no devices are found for the specified brand', async () => {
    expect(getDeviceByBrand('BrandC')).rejects.toThrow('No devices found for the given brand');
  });
});
