import { Cryptid } from '../models/cryptid.js'

function index(req, res) {
  Cryptid.find({}).populate([
    {path: 'owner'},
    {path: 'owner.owner'}
  ])
  .then(cryptids => {
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

function create(req, res) {
  req.body.owner = req.user.profile._id
  Cryptid.create(req.body).then(cryptid => {
    res.redirect('/cryptids')
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/')
  })
}

export {
  index,
  newCryptid as new,
  create,
}