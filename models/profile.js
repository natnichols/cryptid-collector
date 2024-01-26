import mongoose from 'mongoose'

const Schema = mongoose.Schema

const diarySchema = new Schema({
  subject: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  entry: String,
  posted: {
    type: Date,
    default: Date.now()
  },
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  diaries: [diarySchema],
  favorites: [{type: Schema.Types.ObjectId, ref: 'Cryptid'}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
