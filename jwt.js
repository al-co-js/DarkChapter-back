import { randomBytes } from 'crypto';
import { sign as _sign, verify as _verify } from 'jsonwebtoken';

const secret = randomBytes(20).toString('base64');

const verify = (token, need) => {
  try {
    const verified = _verify(token, secret);
    return need ? verified : true;
  } catch (err) {
    return false;
  }
};

const sign = (user) => {
  try {
    const signed = _sign(user.toJSON(), secret, { expiresIn: '7h' });
    return signed;
  } catch (err) {
    return false;
  }
};

export { verify, sign };
