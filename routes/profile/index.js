import { Router } from 'express';

import detail from './detail';
import get from './get';
import registry from './registry';

const router = Router();

router.use('/detail', detail);
router.use('/get', get);
router.use('/registry', registry);

export default router;
