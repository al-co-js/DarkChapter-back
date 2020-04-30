import { Schema, model } from 'mongoose';

const User = new Schema({
  name: String,
  schoolId: String,
  id: String,
  password: String,
  timestamp: { type: Date, default: Date.now() },
});

export default model('Users', User);
