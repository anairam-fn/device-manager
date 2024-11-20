import { listAllDevices } from "../services/listDevices";

export const handleListAllDevices = async () => {
  try { 
    const devices = await listAllDevices();

    return {
      statusCode: 200,
      body: devices,
    };
  } catch (error) {
    throw error;
  }
  
}