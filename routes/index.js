import { Router } from 'express';

import auth from './auth';
import profile from './profile';

const router = Router();

router.use('/auth', auth);
router.use('/profile', profile);

export default router;
