import { Router } from 'express';

import { verify } from '../../jwt';

const router = Router();

router.post('/', (req, res) => {
  const { token, need } = req.body;
  if (!token) {
    res.sendStatus(403);
    return;
  }

  const verified = verify(token, need);
  if (!verified) {
    res.sendStatus(403);
    return;
  }

  res.send(verified);
});

export default router;
