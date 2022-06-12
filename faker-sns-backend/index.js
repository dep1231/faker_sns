const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();
const { readdirSync } = require("fs");
const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");
const uploadRouter = require("./routes/Upload");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors("http://localhost:3000"));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/upload", uploadRouter);

// routes

// readdirSync("./routes").map((route) =>
//   app.use("/", require("./routes/" + route))
// );

// database

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDB接続完了"))
  .catch((error) => console.log("mongoDB接続エラー"));

app.listen(PORT, () => {
  console.log("server起動");
});
