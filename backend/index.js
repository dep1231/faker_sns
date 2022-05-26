const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { readdirSync } = require("fs");
const useRouter = require("./routes/User");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/user", useRouter);

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
