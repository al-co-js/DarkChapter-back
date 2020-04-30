import { Router } from 'express';
import { pbkdf2Sync, randomBytes } from 'crypto';

import User from '../../models/user';

const router = Router();

router.post('/', async (req, res) => {
  const {
    name, schoolId, id, password,
  } = req.body;
  if (!(name && schoolId && id && password)) {
    res.sendStatus(412);
    return;
  }

  const user = await User.findOne({ id });
  if (user) {
    res.sendStatus(409);
    return;
  }

  const salt = randomBytes(20).toString('base64');

  const encryptPassword = pbkdf2Sync(password, salt, 100000, 64, 'SHA512');
  if (!encryptPassword) {
    res.sendStatus(500);
    return;
  }

  const newUser = new User({
    name,
    schoolId,
    id,
    password: `${encryptPassword.toString('base64')}|${salt}`,
  });

  newUser.save((err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
});

export default router;
