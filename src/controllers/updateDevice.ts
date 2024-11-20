import { Request } from 'express';
import { updateDevice } from '../services/updateDevice';

export const handleUpdateDevice = async (req: Request) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const device = await updateDevice(Number(id), data);

    return {
      statusCode: 200,
      body: device,
    };
  } catch (error) {
    throw error;
  }
}