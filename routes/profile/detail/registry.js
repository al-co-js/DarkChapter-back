import { Router } from 'express';

import ProfileDetail from '../../../models/profileDetail';

const router = Router();

router.post('/', (req, res) => {
  const { id, uploader, image } = req.body;
  if (!(id && uploader && image)) {
    res.sendStatus(412);
    return;
  }

  const newProfileDetail = new ProfileDetail({
    id,
    uploader,
    image,
  });

  newProfileDetail.save((err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

export default router;
