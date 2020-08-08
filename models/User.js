import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'root'],
    },
  },
  {
    timestamps: true,
  }
)

export default models.User || model('User', UserSchema)
