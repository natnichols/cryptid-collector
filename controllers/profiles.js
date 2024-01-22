import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({}).then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: '👽'
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.profileId)
  .populate(
    // {path: 'diaries'},
    {path: 'diaries.author'},
  )
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
      title: `👽 ${profile.name}'s profile`,
      profile,
      isSelf,
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/profiles')
  })
}

function createDiary(req, res) {
  Profile.findById(req.user.profile._id).then(profile => {
    req.body.author = req.user.profile._id
    profile.diaries.push(req.body)
    profile.save().then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(`🚨💥🖍️`, err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function deleteDiary(req, res) {
  Profile.findById(req.user.profile._id).then(profile => {
    profile.diaries.remove({_id: req.params.diaryId})
    profile.save().then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(`🚨💥🖍️`, err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function newDiary(req, res) {
  req.body.author = req.user.profile._id
  res.render('profiles/newDiary', {
    title: 'New Diary'
  })
}

function editDiary(req, res) {
  Profile.findById(req.params.profileId).then(profile => {
    const diary = profile.diaries.id(req.params.diaryId)
    if (diary.author.equals(req.user.profile._id)) {
      res.render('profiles/editDiary', {
        profile,
        diary,
        title: 'Edit Diary 📝👽📓'
      })
    } else {
      throw new Error ('🚫👻 Not authorized 😡🛑')
    }
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect(`/profiles`)
  })
}

export {
  index,
  show,
  createDiary,
  deleteDiary,
  newDiary,
  editDiary,
}