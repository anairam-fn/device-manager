import { Router } from 'express';
import device from './device';

const router = Router();

router.use(device);

export { router };