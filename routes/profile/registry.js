import { Router } from 'express';

import Profile from '../../models/profile';

const router = Router();

router.post('/', async (req, res) => {
  const { target, uploader, image } = req.body;
  if (!(target && uploader && image)) {
    res.sendStatus(412);
    return;
  }

  const newProfile = new Profile({
    target,
    uploader,
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
