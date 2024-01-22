import { Router } from 'express'
import * as cryptidsCtrl from '../controllers/cryptids.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/cryptids
router.get('/', cryptidsCtrl.index)
// GET localhost:3000/cryptids/new
router.get('/new', isLoggedIn, cryptidsCtrl.new)
// GET localhost:3000/cryptids/:cryptidId
router.get('/:cryptidId', cryptidsCtrl.show)
// GET localhost:3000/cryptids/:cryptidId/edit
router.get('/:cryptidId/edit', isLoggedIn, cryptidsCtrl.edit)
// GET localhost:3000/cryptids/:cryptidId/comments/:commentId/edit

// POST localhost:3000/cryptids
router.post('/', isLoggedIn, cryptidsCtrl.create)
// POST localhost:3000/cryptids/:cryptidId/comments

// DELETE localhost:3000/cryptids/:cryptidId
router.delete('/:cryptidId', isLoggedIn, cryptidsCtrl.delete)
// DELETE localhost:3000/cryptids/:cryptidId (delete comment)

// PUT localhost:3000/cryptids/:cryptidId (update)
router.put('/:cryptidId', isLoggedIn, cryptidsCtrl.update)
// PUT localhost:3000/cryptids/:cryptidId/comments/:commentId (update comment)

/* 
// PATCH localhost:3000/cryptids/:cryptidId/flip-spotted*/


export {
  router
}