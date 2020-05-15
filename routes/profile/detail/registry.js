import { Router } from 'express';

import ProfileDetail from '../../../models/profileDetail';

const router = Router();

router.post('/', (req, res) => {
  const {
    id, uploader, image, content,
  } = req.body;
  if (!(id && uploader && image && content)) {
    res.sendStatus(412);
    return;
  }

  const newProfileDetail = new ProfileDetail({
    id,
    uploader,
    image,
    content,
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
