import { Router } from 'express';
import { Hauffman } from 'js-string-compression';

import Profile from '../../models/profile';

const router = Router();

router.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const profiles = await Profile.paginate(
    {},
    {
      page,
      limit,
      sort: limit === '5' ? { view: -1 } : { timestamp: -1 },
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

  const hm = new Hauffman();
  res.send(hm.compress(JSON.stringify(profiles.docs)));
});

export default router;
