import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true)
      }

      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })


/* ALTERNATIVE

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

app.options('*', cors(corsOptions))
app.use(cors())

*/