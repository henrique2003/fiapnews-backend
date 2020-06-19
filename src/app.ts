import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import { config } from 'dotenv'
import routes from './app/routes'
config()

class App {
  public readonly express: express.Application

  constructor () {
    this.express = express()
    this.connectDb()
    this.middlewares()
    this.routes()
  }

  private async connectDb (): Promise<void> {
    try {
      await connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/fiapnews', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      console.log('MongoDb connect')
    } catch (error) {
      console.log('Error to connect MongoDb')
      process.exit(1)
    }
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(helmet())
  }

  private routes (): void {
    this.express.use('/api', routes)
  }
}

export default new App().express
