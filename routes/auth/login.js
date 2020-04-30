import { Router } from 'express';
import { pbkdf2Sync } from 'crypto';

import { sign } from '../../jwt';
import User from '../../models/user';

const router = Router();

router.post('/', async (req, res) => {
  const { id, password } = req.body;
  if (!(id && password)) {
    res.sendStatus(412);
    return;
  }

  const user = await User.findOne({ id });
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const buf = user.password.split('|');
  const encryptPassword = pbkdf2Sync(password, buf[1], 100000, 64, 'SHA512');
  if (!encryptPassword) {
    res.sendStatus(500);
    return;
  }

  if (buf[0] === encryptPassword.toString('base64')) {
    user.password = undefined;
    user._id = undefined;
    user.__v = undefined;
    const token = sign(user);
    if (!token) {
      res.sendStatus(500);
    }
    res.send(token);
    return;
  }

  res.sendStatus(401);
});

export default router;
