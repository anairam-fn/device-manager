import { Request, Response, NextFunction } from 'express';
import { ZodSchema, z } from 'zod';
import { validateSchema } from '../../../src/middlewares/validateSchema';

describe('validateSchema middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let schema: ZodSchema;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    schema = z.object({
      name: z.string(),
      age: z.number(),
    });
  });

  it('should call next if validation succeeds', () => {
    req.body = { name: 'john', age: 12 };

    const middleware = validateSchema(schema);
    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 422 if validation fails', () => {
    req.body = { name: 'computer', age: "one" };

    const middleware = validateSchema(schema);
    middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      message: 'age: Expected number, received string',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should merge req.body, req.params, and req.query correctly', () => {
    req.body = { name: 'john', age: 30 };
    req.params = { id: '30' };
    req.query = { filter: 'active' };

    const middleware = validateSchema(schema);
    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(req.body).toEqual({ name: 'john', age: 30 });
    expect(req.params).toEqual({ id: '30', name: 'john', age: 30 });
    expect(req.query).toEqual({ filter: 'active', name: 'john', age: 30 });
  });
});
