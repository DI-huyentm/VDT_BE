const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
require("./models/index");

const studentRouter = require("./routes/studentRoutes");

dotenv.config({
  path: "./config.env",
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use("/students", studentRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(process.env.NODE_APP_PORT_NUMBER, () =>
  console.log("server is running in port 3001")
);
