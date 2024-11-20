import { Request } from 'express';

import { createDevice } from '../services/createDevice';

export const handleCreateDevice = async (req: Request): Promise<{ statusCode: number; body: any }> => {
  try {
    const { name, brand } = req.body;

    const device = await createDevice({ name, brand });

    return {
      statusCode: 201,
      body: device,
    };
  } catch (error: any) {
    if (error.message === 'A device with the same name and brand already exists') {
      return {
        statusCode: 409,
        body: error.message,
      };
    }
    throw error;
  }
};

