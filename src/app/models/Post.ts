import { Schema, model, Document } from 'mongoose'

interface IPost extends Document {
  _id: string
  title: string
  description: string
}

const PostSchema = new Schema({
  titletitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
})

export default model<IPost>('Post', PostSchema)
