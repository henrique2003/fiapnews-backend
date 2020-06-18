import { Request, Response } from 'express'
import { hash, compare } from 'bcrypt'
import { config } from 'dotenv'
import { sign } from 'jsonwebtoken'
import { Admin } from '../models'
config()

class AdminController {
  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const { name, password } = req.body

      if (!name || !password) {
        return res.status(400).json(new Error('Campo em branco'))
      }

      if (await Admin.findOne({ name })) {
        return res.status(400).json(new Error('Nome de usuário em uso'))
      }

      req.body.password = await hash(password, 10)

      const admin = await Admin.create(req.body)

      return res.status(200).json(admin)
    } catch (error) {
      return res.status(500).json(new Error('Server Error'))
    }
  }

  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const { name, password } = req.body

      if (!name || !password) {
        return res.status(400).json(new Error('Campo em branco'))
      }

      const user = await Admin.findOne({ name }).select('+password')

      if (!user) {
        return res.status(400).json(new Error('Usuário não encontrado'))
      }

      if (!await compare(password, user.password)) {
        return res.status(400).json(new Error('Senha inválida'))
      }

      const token = sign(user.id, process.env.SECRET, { expiresIn: 8640 })

      return res.status(200).json({ user, token })
    } catch (error) {
      return res.status(500).json(new Error('Server Error'))
    }
  }

  public async load (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.userId

      const admin = await Admin.findById(id)

      return res.status(200).json(admin)
    } catch (error) {
      return res.status(500).json(new Error('Server Error'))
    }
  }
}

export default new AdminController()
