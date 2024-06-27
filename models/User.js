const { Schema, model } = require('mongoose');
const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max_length: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [emailRegex, 'Please enter a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('frientCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
