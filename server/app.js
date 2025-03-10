import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import dotenv from 'dotenv'
import { indexRouter } from './routes/index.js'
import userRouter from './routes/userRoutes.js'
import docRouter from './routes/docRoutes.js'
import globalErrorHandler from './middlewares/errorHandler.js'
import { AppError } from './utils/appError.js'

dotenv.config({ path: './config.env' })

const app = express()

//SET SECURITY HTTP HEADERS
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://js.stripe.com'],
      frameSrc: ["'self'", 'https://js.stripe.com'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      connectSrc: [
        "'self'",
        'ws:', // Allow all WebSocket connections
      ],
      upgradeInsecureRequests: [],
    },
  }),
)

app.use(helmet.crossOriginEmbedderPolicy({ policy: 'credentialless' }))

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.static('public'))

//For Railway
// app.set("trust proxy", 1 /* number of proxies between user and server */);

// //LIMIT REQUESTS FROM THE API
// const limiter = rateLimit({
//   max: 200,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour",
// });
// app.use("/api", limiter);

app.use(morgan('dev'))

//Body parser, reading data from bodt into req.body
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false, limit: '10kb' }))

// app.use(express.static(path.join(__dirname, "public")));

//Data sanitization against NoSql query injection
app.use(mongoSanitize())

//Data sanitization against XSS
app.use(xss())

//Prevent parameter polution
app.use(
  hpp({
    whitelist: [],
  }),
)

//Allow cors
// app.options("*", cors());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://markdowneditorfullstack.netlify.app',
    ], // Allow your client origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Enable cookies or authorization headers if needed
  }),
)

app.use(cookieParser())

//Tells the browser to fetch a fresh copy of the page validate it with the server before displaying it, for instance if a ligged out user click on the back button, he will see a page where he is logged out
app.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  next()
})

//Routes
app.use('/', indexRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/documents', docRouter)

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).json({ error: 'Not Found' })
})

//.all() is for all http methods
//if a route was not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

//ERROR MIDDLEWARE
app.use(globalErrorHandler)

export default app
