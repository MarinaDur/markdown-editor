import express from 'express'
const router = express.Router()

// Replace any view rendering logic with JSON or API response
export const indexRouter = router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' })
})
