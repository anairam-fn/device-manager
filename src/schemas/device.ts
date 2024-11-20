import { z } from "zod";

export const createDeviceSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .trim()
      .refine((value) => value.trim() !== "", {
        message: "Name cannot be only spaces",
      })
      .transform((value) => value.trim().toLowerCase()),

    brand: z
      .string()
      .min(1)
      .trim()
      .refine((value) => value.trim() !== "", {
        message: "Brand cannot be only spaces",
      })
      .transform((value) => value.trim().toLowerCase()),
  })
  .strict();

export const deleteDeviceSchema = z
  .object({
    id: z
      .string()
      .refine((val) => !isNaN(Number(val)), {
        message: "ID must be a valid number",
      })
      .transform((val) => Number(val)),
  })
  .strict();

export const getDeviceByBrandSchema = z
  .object({
    brand: z
      .string()
      .min(1, "Brand is required")
      .trim()
      .regex(/^[a-zA-Z0-9].*$/, "Brand must start with a letter or number")
      .transform((value) => value.toLowerCase()),
  })
  .strict();

export const getDeviceByIdSchema = z
  .object({
    id: z
      .string()
      .min(1, "ID is required")
      .regex(/^\d+$/, "ID must be a valid number"),
  })
  .strict();

export const updateDeviceSchema = z
  .object({
    id: z
      .string()
      .refine((val) => !isNaN(Number(val)), {
        message: "Invalid device ID",
      })
      .transform((val) => Number(val)),

    name: z
      .string()
      .min(1, "Name should be a non-empty string")
      .optional()
      .transform((value) => value ?.trim().toLowerCase()),

    brand: z
      .string()
      .min(1, "Brand should be a non-empty string")
      .optional()
      .transform((value) => value ?.trim().toLowerCase()),
  })
  .strict()
  .refine((data) => data.name || data.brand, {
    message: "At least one of name or brand must be provided",
    path: ["name", "brand"],
  });
