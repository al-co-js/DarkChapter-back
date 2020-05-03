import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Profile = new Schema({
  target: String,
  uploader: String,
  image: String,
  view: { type: Number, default: 0 },
  detail: [String, String, String],
  timestamp: { type: Date, default: Date.now() },
});

Profile.plugin(mongoosePaginate);

export default model('Profiles', Profile);
