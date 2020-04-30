import { Router } from 'express';

import join from './join';
import login from './login';
import verify from './verify';

const router = Router();

router.use('/join', join);
router.use('/login', login);
router.use('/verify', verify);

export default router;
