import express, { Express, NextFunction } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from "./routes";
import helmet from 'helmet'

import { connect as connectMongoDB } from './config/mongoose.config'
import { AppError } from './core/utils/http.response.util';
import { ErrorMiddleware } from './core/middleware/errorHandler.middleware';

const app: Express = express()

app.use(helmet())

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())


// * Routes
app.use(router);


// * CORS Config
const whitelist = ['http://localhost:8080', 'http://localhost:5173']

const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    origin = origin || ''

    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('NOT ALLOWED BY CORS'))
    }
  },
}

// * Middlewares
app.options('*', cors(corsOptions))
app.use(cors())
app.use(ErrorMiddleware)


// * Content Type Config
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))



connectMongoDB()


export default app
