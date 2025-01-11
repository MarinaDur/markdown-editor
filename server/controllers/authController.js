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
import Document from "../models/docModel.js";

export const signup = [
  validateSignup,
  catchAsync(async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ error: errors.array() });
    // }

    const { name, email, password, passwordConfirm } = req.body;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!passwordConfirm) missingFields.push("password confirmation");

    // If there are missing fields, return an error
    if (missingFields.length > 0) {
      const errorMessage =
        missingFields.length === 1
          ? `Please provide the ${missingFields[0]}.`
          : `Please provide the following fields: ${missingFields.join(", ")}.`;
      return next(new AppError(errorMessage, 400));
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    try {
      const documents = [
        {
          createdAt: Date.now(),
          user: newUser._id,
          name: "welcome.md",
          content:
            "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
        },
        {
          createdAt: Date.now(),
          user: newUser._id,
          name: "untitled - document.md",
          content: "",
        },
      ];

      await Document.insertMany(documents);
    } catch (err) {
      req.defaultDocsError = true;
      // Optionally log this or notify the user of a partial success
    }

    req.user = newUser;

    sendToken(newUser, 201, res, req.defaultDocsError);
  }),
];

export const login = catchAsync(async (req, res, next) => {
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
    secure: true,
    sameSite: "none",
    path: "/",
  });
  req.session = null;
  // res.clearCookie("jwt", {path: '/', domain: ""});
  res.status(200).json({ status: "success" });
};

export const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  // req.headers.authorization?.startsWith("Bearer")
  //   ? req.headers.authorization.split(" ")[1]

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

    // const resetURL = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/users/resetPassword/${resetToken}`;
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

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
