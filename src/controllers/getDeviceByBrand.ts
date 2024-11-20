import { Request } from "express";
import { getDeviceByBrand } from "../services/getDeviceByBrand";

export const handleGetDeviceByBrand = async (req: Request) => {
  try {
    const brand = req.params.brand as string;

    const device = await getDeviceByBrand(brand);

    return {
      statusCode: 200,
      body: device,
    };
  } catch (error) {
    throw error;
  }
};
