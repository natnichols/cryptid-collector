import { Cryptid } from '../models/cryptid.js'
import { Profile } from '../models/profile.js'

function index(req, res) {
  Cryptid.find({}).populate('owner')
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
  const spottedDate = dt.toISOString(/*[], {hour: '2-digit', minute: '2-digit'}*/).slice(0, 16)
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
    {path: 'owner.owner'},
    {path: 'comments.author'},
    // {path: 'comments.spotted'},
  ]).then(cryptid => {
    // req.body.comment.spotted = !!req.body.comment.spotted
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

function deleteCryptid(req, res) {
  Cryptid.findById(req.params.cryptidId).then(cryptid => {
    if (cryptid.owner.equals(req.user.profile._id)) {
      cryptid.deleteOne().then(()=> {
        res.redirect('/cryptids')
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

function addComment(req, res) {
  Cryptid.findById(req.params.cryptidId).then(cryptid => {
    req.body.spotted = !!req.body.spotted
    req.body.author = req.user.profile._id
    cryptid.comments.push(req.body)
    cryptid.save().then(()=> {
      res.redirect(`/cryptids/${cryptid._id}`)
    })
    .catch(err => {
      console.log(`🚨💥🖍️`, err)
      res.redirect('/cryptids')
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/cryptids')
  })
}

function editComment(req, res) {
  Cryptid.findById(req.params.cryptidId).then(cryptid => {
    const comment = cryptid.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      res.render('cryptids/editComment', {
        cryptid,
        comment,
        title: 'Update Comment 📝'
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

function updateComment(req, res) {
  Cryptid.findById(req.params.cryptidId).then(cryptid => {
    const comment = cryptid.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      comment.set(req.body)
      cryptid.save().then(() => {
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

function deleteComment(req, res) {
  Cryptid.findById(req.params.cryptidId).then(cryptid => {
    const comment = cryptid.comments.id(req.params.commentId)
    if (comment.author.equals(req.user.profile._id)) {
      cryptid.comments.remove(comment)
      cryptid.save().then(()=> {
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

function addFavorite(req, res) {
  Cryptid.findById(req.params.cryptidId).then(cryptid => {
    // req.body.author = req.user.profile._id
    Profile.findById(req.user.profile._id).then(profile => {
      profile.favorites.push(req.params.cryptidId)
      profile.save().then(()=> {
        res.redirect('/cryptids')
      })
      .catch(err => {
        console.log(`🚨💥🖍️`, err)
        res.redirect('/cryptids')
      })
    })
    .catch(err => {
      console.log(`🚨💥🖍️`, err)
      res.redirect('/cryptids')
    })
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
  deleteCryptid as delete,
  addComment,
  editComment,
  updateComment,
  deleteComment,
  addFavorite,
}