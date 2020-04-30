import { Router } from 'express';

import get from './get';
import registry from './registry';

const router = Router();

router.use('/get', get);
router.use('/registry', registry);

export default router;
