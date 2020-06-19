import { Schema, model, Document } from 'mongoose'

interface IPost extends Document {
  _id: string
  title: string
  description: string
}

const PostSchema = new Schema({
  title: String,
  description: String
})

export default model<IPost>('Post', PostSchema)
