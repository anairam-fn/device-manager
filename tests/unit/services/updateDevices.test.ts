import { PrismaClient } from '@prisma/client';
import { updateDevice } from '../../../src/services/index';

const prisma = new PrismaClient();

describe('updateDevice', () => {
  const initialDeviceData = { name: 'Device1', brand: 'BrandA' };
  let deviceId: number;

  beforeAll(async () => {
    await prisma.device.deleteMany({});
  });

  beforeEach(async () => {
    const device = await prisma.device.create({ data: initialDeviceData });
    deviceId = device.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should update a device successfully providing name and brand (full update)', async () => {
    const updatedDeviceData = { name: 'UpdatedDevice', brand: 'UpdatedBrand' };
    const device = await updateDevice(deviceId, updatedDeviceData);
    expect(device).toHaveProperty('id', deviceId);
    expect(device).toHaveProperty('name', updatedDeviceData.name);
    expect(device).toHaveProperty('brand', updatedDeviceData.brand);
  });

  it('should update a device successfully providing only a name (partial update)', async () => {
    const updatedDeviceData = { name: 'UpdatedDeviceTwo' };
    const device = await updateDevice(deviceId, updatedDeviceData);
    expect(device).toHaveProperty('id', deviceId);
    expect(device).toHaveProperty('name', updatedDeviceData.name);
    expect(device).toHaveProperty('brand', initialDeviceData.brand);
  });

  it('should update a device successfully providing only a brand (partial update)', async () => {
    const updatedDeviceData = { brand: 'UpdatedBrandTwo' };
    const device = await updateDevice(deviceId, updatedDeviceData);
    expect(device).toHaveProperty('id', deviceId);
    expect(device).toHaveProperty('brand', updatedDeviceData.brand);
    expect(device).toHaveProperty('name', initialDeviceData.name);
  });

  it('should throw an error if the device does not exist', async () => {
    const nonExistentDeviceId = 9999;
    const updatedDeviceData = { name: 'UpdatedDevice', brand: 'UpdatedBrand' };
    await expect(updateDevice(nonExistentDeviceId, updatedDeviceData)).rejects.toThrow('Device not found for update');
  });
});
