import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan"; // Remove the duplicate `morgan` import
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

// const indexRouter = require("./routes/index");
import { indexRouter } from "./routes/index.js";
// const userRouter = require("./routes/userRoutes");
import userRouter from "./routes/userRoutes.js";
import docRouter from "./routes/docRoutes.js";
import globalErrorHandler from "./middlewares/errorHandler.js";
import { AppError } from "./utils/appError.js";

const app = express();

//Tells the browser to fetch a fresh copy of the page validate it with the server before displaying it, for instance if a ligged out user click on the back button, he will see a page where he is logged out
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-cache, no-store, must-revalidate, private, max-age=0"
  );
  next();
});

//SET SECURITY HTTP HEADERS
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com"],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      connectSrc: [
        "'self'",
        "ws:", // Allow all WebSocket connections
      ],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static("public"));

//LIMIT REQUESTS FROM THE API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

app.use(morgan("dev"));

//Body parser, reading data from bodt into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

// app.use(express.static(path.join(__dirname, "public")));

//Data sanitization against NoSql query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter polution
app.use(
  hpp({
    whitelist: [],
  })
);

//Allow cors
// app.options("*", cors());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow your client origin
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true, // Enable cookies or authorization headers if needed
  })
);

app.use(cookieParser());

//Routes
app.use("/", indexRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/documents", docRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ error: "Not Found" });
});

//.all() is for all http methods
//if a route was not found
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//ERROR MIDDLEWARE
app.use(globalErrorHandler);

export default app;
