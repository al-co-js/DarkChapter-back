import { Router } from 'express';

import Profile from '../../../models/profile';
import ProfileDetail from '../../../models/profileDetail';

const router = Router();

router.post('/', async (req, res) => {
  const { id } = req.body;
  const details = await ProfileDetail.find({ id });
  if (!details) {
    res.sendStatus(500);
    return;
  }

  const profile = await Profile.findById(id);
  if (!profile) {
    res.sendStatus(404);
    return;
  }

  profile.updateOne({ $inc: { view: 1 } }, (err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(details);
  });
});

export default router;
