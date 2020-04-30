import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Profile = new Schema({
  target: String,
  uploader: String,
  image: String,
  view: Number,
  detail: [String, String],
  timestamp: { type: Date, default: Date.now() },
});

Profile.plugin(mongoosePaginate);

export default model('Profiles', Profile);
