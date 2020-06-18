import { Router } from 'express'
import { AdminController, PostController } from './controllers'
import auth from './middlewares/auth'

const routes = Router()

// Admin
routes.post('/admin', auth, AdminController.store)
routes.get('/load', auth, AdminController.load)
routes.post('/login', AdminController.login)

// Post
routes.get('/post', auth, PostController.index)
routes.post('/post', PostController.store)
routes.delete('/post', PostController.destroy)

export default routes
