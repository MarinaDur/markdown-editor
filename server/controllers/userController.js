import { catchAsync } from '../utils/catchAsync.js'
import { AppError } from '../utils/appError.js'

export const getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id

  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  })
})
