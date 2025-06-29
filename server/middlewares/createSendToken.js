import jsonwebtoken from 'jsonwebtoken'

export const createToken = (id) =>
  jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

export const sendToken = (user, statusCode, res, defaultDocsError = false) => {
  const token = createToken(user._id)
  // console.log(token);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  }

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
  res.cookie('jwt', token, cookieOptions)
  // res.header("Access-Control-Allow-Credentials", true);

  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
    ...(defaultDocsError && {
      message:
        'User created successfully, but default documents could not be created.',
    }),
  })
}
