import { Router } from 'express'
import * as cryptidsCtrl from '../controllers/cryptids.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/cryptids
router.get('/', cryptidsCtrl.index)
// GET localhost:3000/cryptids/new
router.get('/new', isLoggedIn, cryptidsCtrl.new)
// GET localhost:3000/cryptids/:cryptidId

// GET localhost:3000/cryptids/:cryptidId/edit

// GET localhost:3000/cryptids/:cryptidId/comments/:commentId/edit

// POST localhost:3000/cryptids
router.post('/', isLoggedIn, cryptidsCtrl.create)
// POST localhost:3000/cryptids/:cryptidId/comments

// DELETE localhost:3000/cryptids/:cryptidId

// DELETE localhost:3000/cryptids/:cryptidId

// PUT localhost:3000/cryptids/:cryptidId (update)

// PUT localhost:3000/cryptids/:cryptidId/comments/:commentId (update comment)

// PATCH localhost:3000/cryptids/:cryptidId/flip-spotted


export {
  router
}