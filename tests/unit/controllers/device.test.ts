import { Request } from 'express';
import { 
  handleUpdateDevice, 
  handleCreateDevice, 
  handleDeleteDevice, 
  handleGetDeviceByBrand, 
  handleGetDeviceById, 
  handleListAllDevices 
} from '../../../src/controllers/index';
import { 
  createDevice, 
  deleteDevice, 
  getDeviceByBrand, 
  getDeviceById, 
  listAllDevices, 
  updateDevice 
} from '../../../src/services/index';

jest.mock('../../../src/services/createDevice');
jest.mock('../../../src/services/deleteDevice');
jest.mock('../../../src/services/getDeviceByBrand');
jest.mock('../../../src/services/getDeviceById');
jest.mock('../../../src/services/listDevices');
jest.mock('../../../src/services/updateDevice');

describe('Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('handleCreateDevice', () => {
    let req: Partial<Request>;
  
    beforeEach(() => {
      req = {
        body: {
          name: 'Test Device',
          brand: 'Test Brand',
        },
      };

    });
  
    it('should return 201 and the created device when successful', async () => {
      const mockDevice = { id: 1, name: 'Test', brand: 'Test Brand' };
      (createDevice as jest.Mock).mockResolvedValue(mockDevice);
  
      const result = await handleCreateDevice(req as Request);
  
      expect(result).toEqual({
        statusCode: 201,
        body: mockDevice,
      });
    });
  
    it('should return 409 if a device with the same name and brand already exists', async () => {
      const error = new Error('A device with the same name and brand already exists');
      (createDevice as jest.Mock).mockRejectedValue(error);
  
      const result = await handleCreateDevice(req as Request);
  
      expect(result).toEqual({
        statusCode: 409,
        body: error.message,
      });
    });
  
    it('should throw an error for other exceptions', async () => {
      const error = new Error('Some other error');
      (createDevice as jest.Mock).mockRejectedValue(error);
  
      await expect(handleCreateDevice(req as Request)).rejects.toThrow('Some other error');
    });
  });

  describe('handleDeleteDevice', () => {
    let req: Partial<Request>;
  
    beforeEach(() => {
      req = {
        params: {
          id: '1',
        },
      };
    });
  
    it('should return 200 and success message when device is deleted', async () => {
      const mockDevice = { id: 1, name: 'Device 1' };
      (deleteDevice as jest.Mock).mockResolvedValue(mockDevice);
  
      const response = await handleDeleteDevice(req as Request);
  
      expect(response).toEqual({
        statusCode: 200,
        body: {
          message: 'Device 1 deleted successfully',
          device: mockDevice,
        },
      });
      expect(deleteDevice).toHaveBeenCalledWith(1);
    });
  
    it('should throw an error if deleteDevice throws an error', async () => {
      const errorMessage = 'Error deleting device';
      (deleteDevice as jest.Mock).mockRejectedValue(new Error(errorMessage));
  
      await expect(handleDeleteDevice(req as Request)).rejects.toThrow(errorMessage);
      expect(deleteDevice).toHaveBeenCalledWith(1);
    });
  });

  describe("handleGetDeviceByBrand", () => {
    let req: Partial<Request>;
  
    beforeEach(() => {
      req = {
        params: {
          brand: "testBrand",
        },
      };
    });
  
    it("should return device data with status code 200", async () => {
      const mockDevice = { id: 1, name: "Device1", brand: "testBrand" };
      (getDeviceByBrand as jest.Mock).mockResolvedValue(mockDevice);
  
      const result = await handleGetDeviceByBrand(req as Request);
  
      expect(result).toEqual({
        statusCode: 200,
        body: mockDevice,
      });
      expect(getDeviceByBrand).toHaveBeenCalledWith("testBrand");
    });
  
    it("should throw an error if getDeviceByBrand throws an error", async () => {
      const mockError = new Error("Something went wrong");
      (getDeviceByBrand as jest.Mock).mockRejectedValue(mockError);
  
      await expect(handleGetDeviceByBrand(req as Request)).rejects.toThrow(mockError);
      expect(getDeviceByBrand).toHaveBeenCalledWith("testBrand");
    });
  });

  describe("handleGetDeviceById", () => {
    let req: Partial<Request>;
  
    beforeEach(() => {
      req = {
        params: {
          id: "1",
        },
      };
    });
  
    it("should return device data with status code 200", async () => {
      const mockDevice = { id: 1, name: "Device 1" };
      (getDeviceById as jest.Mock).mockResolvedValue(mockDevice);
  
      const result = await handleGetDeviceById(req as Request);
  
      expect(result).toEqual({
        statusCode: 200,
        body: mockDevice,
      });
      expect(getDeviceById).toHaveBeenCalledWith(1);
    });
  
    it("should throw an error if getDeviceById throws an error", async () => {
      const mockError = new Error("Device not found");
      (getDeviceById as jest.Mock).mockRejectedValue(mockError);
  
      await expect(handleGetDeviceById(req as Request)).rejects.toThrow(mockError);
      expect(getDeviceById).toHaveBeenCalledWith(1);
    });
  });

  describe("handleListAllDevices", () => {
    it("should return status code 200 and list of devices", async () => {
      const mockDevices = [{ id: 1, name: "Device 1" }, { id: 2, name: "Device 2" }];
      (listAllDevices as jest.Mock).mockResolvedValue(mockDevices);
  
      const result = await handleListAllDevices();
  
      expect(result).toEqual({
        statusCode: 200,
        body: mockDevices,
      });
    });
  
    it("should throw an error if listAllDevices fails", async () => {
      const mockError = new Error("Failed to list devices");
      (listAllDevices as jest.Mock).mockRejectedValue(mockError);
  
      await expect(handleListAllDevices()).rejects.toThrow("Failed to list devices");
    });
  });

  describe('handleUpdateDevice', () => {
    let req: Partial<Request>;

    beforeEach(() => {
      req = {
        params: { id: '1' },
        body: { name: 'New Device Name' },
      };
    });

    it('should return status code 200 and updated device', async () => {
      const mockDevice = { id: 1, name: 'New Device Name' };
      (updateDevice as jest.Mock).mockResolvedValue(mockDevice);

      const result = await handleUpdateDevice(req as Request);

      expect(result).toEqual({
        statusCode: 200,
        body: mockDevice,
      });
      expect(updateDevice).toHaveBeenCalledWith(1, { name: 'New Device Name' });
    });

    it('should throw an error if updateDevice throws an error', async () => {
      const mockError = new Error('Update failed');
      (updateDevice as jest.Mock).mockRejectedValue(mockError);

      await expect(handleUpdateDevice(req as Request)).rejects.toThrow('Update failed');
    });
  });
});
