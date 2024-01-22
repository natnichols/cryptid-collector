import { Cryptid } from '../models/cryptid.js'

function index(req, res) {
  Cryptid.find({}).then(cryptids => {
    res.render('cryptids/index', {
      cryptids,
      title: '🦇'
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/')
  })
}

function newCryptid(req, res) {
  const newCryptid = new Cryptid()
  const dt = newCryptid.spotted
  const spottedDate = dt.toISOString().slice(0, 16)
  res.render('cryptids/new', {
    title: 'Add Cryptid',
    spottedDate
  })
}

export {
  index,
  newCryptid as new,
}