import { Request, Response } from 'express'
import { Post } from '../models'

class PostController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const posts = await Post.find({})

      return res.status(200).json(posts)
    } catch (error) {
      return res.status(500).json(new Error('Server Error'))
    }
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const { title, message } = req.body

      if (!title || !message) {
        return res.status(400).json(new Error('Campo em branco'))
      }

      const post = await Post.create(req.body)

      return res.status(200).json(post)
    } catch (error) {
      return res.status(500).json(new Error('Server Error'))
    }
  }

  public async destroy (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json(new Error('Id requerido'))
      }

      await Post.findByIdAndDelete(id)

      return res.status(204).json()
    } catch (error) {
      return res.status(500).json(new Error('Server Error'))
    }
  }
}

export default new PostController()
