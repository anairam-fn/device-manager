import { Request } from "express";
import { getDeviceById } from "../services/getDeviceById";

export const handleGetDeviceById = async (req: Request) => {
  try {
    const { id } = req.params;

    const device = await getDeviceById(Number(id));

    return {
      statusCode: 200,
      body: device,
    };
  } catch (error) {
    throw error;
  }
};
