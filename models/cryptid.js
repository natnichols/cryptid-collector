import { mongoose } from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  spotted: Boolean,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const cryptidSchema = new Schema({
  name: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  description: String,
  spotted: {
    type: Date,
    default: Date.now()
  },
  comments: [commentSchema]
}, {
  timestamps: true
})

const Cryptid = mongoose.model('Cryptid', cryptidSchema)

export {
  Cryptid
}