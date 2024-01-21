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

export {
  index,
}