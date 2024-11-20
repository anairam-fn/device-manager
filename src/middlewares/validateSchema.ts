import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    const result = schema.safeParse(data);

    if (!result.success) {
      const errors = result.error.errors
        .map((t) => `${t.path.join(".")}: ${t.message}`)
        .join(", ");

      res.status(422).json({ message: errors });

      return;
    }

    req.body = { ...req.body, ...result.data };
    req.params = { ...req.params, ...result.data };
    req.query = { ...req.query, ...result.data };

    next();
  };
};
