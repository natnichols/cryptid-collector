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
    [{path: 'diaries.author'},
    {path: 'favorites'},]
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
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
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
  Profile.findById(req.user.profile._id).then(profile => {
    console.log(profile)
    const newDiaryDate = new Date().toISOString().slice(0, 16)
    req.body.author = req.user.profile._id
    profile.diaries.push(req.body)
    profile.save().then(()=> {
      res.render('profiles/newDiary', {
        title: 'New Diary',
        newDiaryDate
      })
    })
    .catch(err => {
      console.log(`🚨💥🖍️`, err)
      res.redirect('/profiles')
    })
  })
  .catch(err => {
    console.log(`🚨💥🖍️`, err)
    res.redirect('/profiles')
  })
}

function editDiary(req, res) {
  Profile.findById(req.params.profileId).then(profile => {
    const diary = profile.diaries.id(req.params.diaryId)
    const postDefaultDate = diary.posted.toISOString().slice(0, 16)
    if (diary.author.equals(req.user.profile._id)) {
      res.render('profiles/editDiary', {
        profile,
        diary,
        title: 'Edit Diary 📝👽📓',
        postDefaultDate
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

function updateDiary(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  //find profile using :profileId
  Profile.findById(req.params.profileId).then(profile => {
    //find diary using :diaryId defined on route
    const diary = profile.diaries.id(req.params.diaryId)
    //confirm editor is author
    if (diary.author.equals(req.user.profile._id)) {
      // set new diary content using diary.set(req.body)
      diary.set(req.body)
      // save parent profile doc
      profile.save().then(()=> {
        // redirect to show profile
        res.redirect(`/profiles/${profile._id}`)
      })
      .catch(err => {
        console.log(`🚨💥🖍️`, err)
        res.redirect(`/profiles`)
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
  updateDiary,
}