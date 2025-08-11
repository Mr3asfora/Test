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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () =>
  console.log(`Server is running on port:  http://localhost:${port}`)
);
