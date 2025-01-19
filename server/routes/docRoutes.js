import express from 'express'
import { protect } from '../controllers/authController.js'
import {
  createDefaultDocsOnSignup,
  deleteUserOneDoc,
  getUserDocs,
  getUserOneDoc,
  postDoc,
  updateUserDoc,
} from '../controllers/docController.js'
const router = express.Router()

router.use(protect)

router.post('/createDefaultDocsOnSignup', createDefaultDocsOnSignup)
router.post('/postDoc', postDoc)
router.get('/getUserDocs', getUserDocs)
router
  .route('/:docId')
  .get(getUserOneDoc)
  .patch(updateUserDoc)
  .delete(deleteUserOneDoc)

export default router
