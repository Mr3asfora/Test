const express = require("express");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
corsCredentials = {
  origin: "http://localhost:5173",
  methods: "*",
  credentials: true,
};

app.use(cors(corsCredentials));

const sequelize = require("./databases/SQL/pool");

const authRouter = require("./services/Auth/AuthRouter");

const v1 = "/api/v1";

app.use(`${v1}/auth`, authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    code: error.statusCode || 500,
    status: error.statusText || "Internal Server Error",
    message: error.message,
  });
});

app.listen(port, () =>
  sequelize
    .sync()
    .then(() =>
      console.log(
        `Server is running on port:  http://localhost:${port}\nDB connection established ♥`
      )
    )
    .catch((err) => console.log(`cannot connect to the database ${err} !`))
);
