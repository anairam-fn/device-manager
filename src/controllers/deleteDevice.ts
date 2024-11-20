import { Request } from 'express';

import { deleteDevice } from '../services/deleteDevice';

export const handleDeleteDevice = async (req: Request) => {
  try {
    const { id } = req.params;

  const device = await deleteDevice(Number(id));

  return {
    statusCode: 200,
    body: {
      message: `Device ${id} deleted successfully`,
      device,
    },
  };
  } catch (error) {
    throw error;
  }
}
