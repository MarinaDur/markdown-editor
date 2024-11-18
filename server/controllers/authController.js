import { validationResult } from "express-validator";
import crypto from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { validateSignup } from "../middlewares/validateSignup.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import { sendToken } from "../middlewares/createSendToken.js";
import { AppError } from "../utils/appError.js";
import { stat } from "fs";
import Email from "../utils/email.js";

export const signup = [
  validateSignup,
  catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    req.user = newUser;
    next();
    // sendToken(newUser, 201, res);
  }),
];

export const login = catchAsync(async (req, res, next) => {
  console.log("Login route hit with body:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password"); //+password is to select a field that is by default not appears in the output

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  sendToken(user, 200, res);
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

export const protect = catchAsync(async (req, res, next) => {
  console.log("Headers:", req.headers);

  const token = req.cookies.jwt;
  // req.headers.authorization?.startsWith("Bearer")
  //   ? req.headers.authorization.split(" ")[1]
  console.log("token", req.cookies.jwt);
  console.log("cookies", req.cookies);
  if (!token || token === "loggedout") {
    return next(
      new AppError("You are not logged in, please log in to get access", 400)
    );
  }
  //Verify token

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Invalid token. Please log in again.", 401));
  }

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists", 401)
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password, please log in again", 401)
    );
  }

  req.user = currentUser;

  next();
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  console.log("Request body:", req.body);

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with that email", 404));
  }

  const resetToken = user.createPasswordResetToken();

  // Debugging: Log the reset token and expiry
  console.log("Generated reset token:", resetToken);
  console.log("Reset token expiration:", user.passwordResetExpires);

  try {
    // Attempt to save the user with the reset token and expiry
    await user.save({ validateBeforeSave: false });
    console.log("User after save:", user); // Log user to check token fields

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    console.error("Error saving user:", err); // Log the error

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email, try again later", 500)
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 500));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  sendToken(user, 200, res);
});
