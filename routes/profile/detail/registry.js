import { Router } from 'express';

import { verify } from '../../../jwt';
import ProfileDetail from '../../../models/profileDetail';

const router = Router();

router.post('/', (req, res) => {
  const {
    token, id, image, content,
  } = req.body;
  if (!(token && id && image && content)) {
    res.sendStatus(412);
    return;
  }

  const verified = verify(token, true);
  if (!verified) {
    res.sendStatus(403);
  }

  const newProfileDetail = new ProfileDetail({
    id,
    uploader: `${verified.schoolId} ${verified.name}`,
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
