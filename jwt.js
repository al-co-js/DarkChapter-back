import { randomBytes } from 'crypto';
import { verify as _verify, sign as _sign } from 'jsonwebtoken';

const secret = randomBytes(20).toString('base64');

const verify = (token, need) => {
  _verify(token, secret, (err, user) => {
    if (err) {
      return false;
    }

    if (need) {
      return user;
    }

    return true;
  });
};

const sign = (user) => {
  _sign(user.toJSON(), secret, { expiresIn: '7h' }, (err, token) => {
    if (err) {
      return false;
    }

    return token;
  });
};

export { verify, sign };
