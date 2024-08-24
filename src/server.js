const express = require("express");
require("dotenv/config");
require("./config/database");
const cors = require("cors");

const app = express();
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const postRout = require("./routes/post.route");

app.use(
  cors({
    origin: "http://localhost:3001",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRout);

app.use(function (error, req, res, next) {
  const message = error.message;
  const data = error.data;
  const code = error.statusCode || 500;
  res.status(code).json({ message, data, status: false });
});

app.listen(process.env.PORT, () => {
  console.log(`Server starts on port ${process.env.PORT}`);
});
