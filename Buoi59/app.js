require("dotenv").config();
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
var createError = require("http-errors");
var express = require("express");
var flash = require("connect-flash");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const validateMessage = require("./middlewares/validate.message");
var authMiddleware = require("./middlewares/auth.middleware");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var profileRouter = require("./routes/profile");
var emailsRouter = require("./routes/email");

var app = express();

app.use(
  session({
    secret: "f8",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(validateMessage);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/auth", authRouter);
// app.use(authMiddleware);
app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/profile", profileRouter);
app.use("/email", emailsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
