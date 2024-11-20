import { Router } from 'express';

import { validateSchema } from '../middlewares/validateSchema';
import { wrapAction } from '../utils/wrapAction';

import { 
  handleCreateDevice, 
  handleGetDeviceByBrand,
  handleGetDeviceById,
  handleListAllDevices,
  handleUpdateDevice,
  handleDeleteDevice,
} from '../controllers/index';

import { 
  createDeviceSchema, 
  getDeviceByIdSchema,
  updateDeviceSchema,
  getDeviceByBrandSchema,
  deleteDeviceSchema,
} from '../schemas/device';

const router = Router();

router.post(
  '/device',
  validateSchema(createDeviceSchema),
  wrapAction(handleCreateDevice),
)

router.get(
  '/device/:id',
  validateSchema(getDeviceByIdSchema),
  wrapAction(handleGetDeviceById),
)

router.get(
  '/devices',
  wrapAction(handleListAllDevices)
)

router.get(
  '/devices/brand/:brand',
  validateSchema(getDeviceByBrandSchema),
  wrapAction(handleGetDeviceByBrand),
)

router.patch(
  '/device/:id',
  validateSchema(updateDeviceSchema),
  wrapAction(handleUpdateDevice)
)

router.delete(
  '/device/:id',
  validateSchema(deleteDeviceSchema),
  wrapAction(handleDeleteDevice),
)

export default router;