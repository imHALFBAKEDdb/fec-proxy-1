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

app.get("/main/api/title/:id", (req, res) => {
  const { id } = req.params;
  const options = {
    url: `http://13.57.36.154:8000/api/title/${id}`,
    method: "get"
  };
  axios(options)
    .then(results => {
      res.send(results.data);
    })
    .catch(error => {
      console.log("ERROR main/api/title/", error);
    });
});

app.get("/middle/api/movie/:movieId", (req, res) => {
  console.log("req.params", req.params);
  const { movieId } = req.params;
  console.log(movieId);
  const options = {
    url: `http://13.57.36.154:1337/api/movie/${movieId}`,
    method: "get"
  };
  axios(options)
    .then(results => {
      console.log("Proxy succes");
      res.send(JSON.stringify(results.data));
    })
    .catch(err => console.log("ERROR middle/api/movie/", err));
});

app.get("/middle/api/review/:reviewId", (req, res) => {
  console.log("req.params", req.params);
  const { reviewId } = req.params;
  const options = {
    url: `http://13.57.36.154:1337/api/review/${reviewId}`,
    method: "get"
  };
  axios(options)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => {
      console.log("ERROR from proxy server", err);
    });
});

app.get("/suggested/api/s", (req, res) => {
  const options = {
    url: "http://13.57.36.154:8080/suggested/api/s",
    method: "get"
  };
  axios(options)
    .then(results => {
      res.send(results.data);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = app;
