import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

const auth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const authHeader = req.header('Authorization')

  if (!authHeader) {
    return res.status(401).json(new Error('Acesso negado'))
  }
  try {
    const decode = verify(authHeader, process.env.SECRET) as { id: string }
    req.userId = decode.id

    next()
  } catch (error) {
    return res.status(401).json(new Error('Acesso negado'))
  }
}

export default auth
