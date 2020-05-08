import { model, Schema } from 'mongoose';

const ProfileDetail = new Schema({
  id: String,
  uploader: String,
  image: String,
  content: String,
  timestamp: { type: Date, default: Date.now() },
});

export default model('ProfileDetails', ProfileDetail);
