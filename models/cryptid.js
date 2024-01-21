import { mongoose } from 'mongoose'

const Schema = mongoose.Schema

const cryptidSchema = new Schema({

}, {
  timestamps: true
})

const Cryptid = mongoose.model('Cryptid', cryptidSchema)

export {
  Cryptid
}