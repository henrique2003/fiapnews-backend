import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  _id: string
  name: string
  password: string
}

const UserSchema = new Schema({
  name: String,
  password: {
    type: String,
    select: false
  }
})

export default model<IUser>('User', UserSchema)
