import { Router } from 'express';

import { verify } from '../../jwt';
import Profile from '../../models/profile';

const router = Router();

router.post('/', async (req, res) => {
  const { token, target, image } = req.body;
  if (!(token && target && image)) {
    res.sendStatus(412);
    return;
  }

  const verified = verify(token, true);
  if (!verified) {
    res.sendStatus(403);
  }

  const newProfile = new Profile({
    target,
    uploader: `${verified.schoolId} ${verified.name}`,
    image,
  });

  newProfile.save((err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

export default router;
