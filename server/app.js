const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const axios = require("axios");

const app = express();
const logger = morgan("dev");

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.get("/suggested/api/s", (req, res) => {
  axios
    .get("/suggested/api/s")
    .then(({ data }) => {
      res.send(JSON.stringify({ data }));
    })
    .catch(error => {
      console.log("ERROR SUGGESTED:", error);
    });
});

app.get("/middle/api/movie", (req, res) => {
  console.log(req.url);
  // res.send(‘hello world’);
  const { movieId } = req.params;
  const options = {
    url: `http://middle:1337/api/movie/`,
    params: {
      movieId
    },
    method: `get`
  };
  axios(options)
    .then(results => {
      console.log(results);
      res.send(JSON.stringify(results.data));
    })
    .catch(err => console.log(err));
});

module.exports = app;
