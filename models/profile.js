import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const commentSchema = new Schema({
//   content: String,
//   spotted: Boolean,
//   author: {type: Schema.Types.ObjectId, ref: 'Profile'}
// }, {
//   timestamps: true
// })

const diarySchema = new Schema({
  subject: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  description: String,
  posted: {
    type: Date,
    default: Date.now()
  },
  // comments: [commentSchema]
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  diaries: [diarySchema]
  // favorites: [array]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
