require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const databaseConnection = require("./db/config");
const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter");
const globalErrHandler = require("./middlewares/globalErrHandler");

const SESSION_KEY = "88e521e77d40c0abe6bc01c8b01f481865fbb4d8";

const app = express();
const serverPort = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: "mongodb://127.0.0.1:27017/bookStore",
      ttl: 24 * 60 * 60,
    }),
  })
);

// middleware
app.use("/users", userRouter);
app.use("/books", bookRouter);

app.use(globalErrHandler);
app.listen(serverPort, async () => {
  console.log(`Server is running at http://localhost:${serverPort}`);
  await databaseConnection();
});
