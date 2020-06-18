import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  _id: string
  name: string
  password: string
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: true
  }
})

export default model<IUser>('User', UserSchema)
