import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is a required field'],
    trim: true,
    minLength: [2, 'Name should be more than one character'],
    validate: {
      validator: function (val) {
        return validator.isAlpha(val, 'en-US', { ignore: ' ' })
      },
      message: 'Name should only contain letters',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is a required field'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is a required field'],
    minLength: 8,
    //not to show up in any output
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm password is a required field'],
    validator: {
      function(val) {
        return val === this.password
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
})

//Set when the password was changes
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000
  next()
})

//Hash the password before saving document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next
})

//Check if the password correct
userSchema.methods.correctPassword = async function (
  enteredPassword,
  savedPassword,
) {
  return await bcrypt.compare(enteredPassword, savedPassword)
}

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000
  next()
})

//Check if the password was changed
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    )
    return JWTTimestamp < changedTimestamp
  }

  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  console.log({ resetToken }, this.passwordResetToken)

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

const User = mongoose.model('User', userSchema)

export default User
