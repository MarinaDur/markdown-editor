import { catchAsync } from '../utils/catchAsync.js'

export const getMe = catchAsync(async (req, res, _next) => {
  req.params.id = req.user.id
  console.log('User ID:', req.params.id)

  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  })
})
