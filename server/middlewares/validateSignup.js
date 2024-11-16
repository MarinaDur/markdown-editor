import { body } from "express-validator";

export const validateSignup = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .matches(/\d/)
    .matches(/[A-Z]/)
    .withMessage(
      "Password must contain at least 8 characters, a number and an uppercase letter"
    ),
  body("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      console.log("password do not match");
    }
    return true;
  }),
];
