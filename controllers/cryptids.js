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
    res.redirect('/cryptids')
  })
}

function show(req, res) {
  Cryptid.findById(req.params.cryptidId).populate([
    {path: 'owner'},
    {path: 'owner.owner'}
  ]).then(cryptid => {
    res.render('cryptids/show', {
      cryptid,
      title: '👻 Show'
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/cryptids')
  })
}

function edit(req, res) {
  Cryptid.findById(req.params.cryptidId).then(cryptid => {
    const spottedDefaultDate = cryptid.spotted.toISOString().slice(0, 16)
    res.render('cryptids/edit', {
      cryptid,
      title: 'edit 👻',
      spottedDefaultDate: spottedDefaultDate
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/cryptids')
  })
}

function update(req, res) {
  Cryptid.findById(req.params.cryptidId).then(cryptid => {
    if (cryptid.owner.equals(req.user.profile._id)) {
      cryptid.updateOne(req.body).then(()=> {
        res.redirect(`/cryptids/${cryptid._id}`)
      })
      .catch(err => {
        console.log(`🚨💥🖍️`, err)
        res.redirect('/cryptids')
      })
    } else {
      throw new Error ('🚫👻 Not authorized 😡🛑')
    }
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/cryptids')
  })
}

export {
  index,
  newCryptid as new,
  create,
  show,
  edit,
  update,
}