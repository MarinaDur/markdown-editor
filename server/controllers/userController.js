import { catchAsync } from '../utils/catchAsync.js'

export const getMe = catchAsync(async (req, res) => {
  req.params.id = req.user.id

  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  })
})
