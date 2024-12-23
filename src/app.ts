import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default app;