import { Router } from 'express';

import Profile from '../../models/profile';

const router = Router();

router.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const profiles = await Profile.paginate(
    {},
    {
      page,
      limit,
    },
  );
  if (!profiles.docs) {
    res.sendStatus(500);
    return;
  }

  if (profiles.docs.length === 0) {
    res.sendStatus(404);
    return;
  }

  res.send(profiles.docs);
});

export default router;
