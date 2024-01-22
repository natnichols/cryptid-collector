import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// GET localhost:3000/profiles
router.get('/', isLoggedIn, profilesCtrl.index)
// GET localhost:3000/profiles/:profileId
router.get('/:profileId', isLoggedIn, profilesCtrl.show)
// POST localhost:3000/profiles/:profileId/diaries
router.post('/:profileId/diaries', isLoggedIn, profilesCtrl.createDiary)
// DELETE localhost:3000/profiles/diaries/:diaryId
router.delete('/diaries/:diaryId', isLoggedIn, profilesCtrl.deleteDiary)


export {
  router
}