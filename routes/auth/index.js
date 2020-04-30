import { Router } from 'express';

import join from './join';
import login from './login';

const router = Router();

router.use('/join', join);
router.use('/login', login);

export default router;
