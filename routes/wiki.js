const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  next();
});

router.get("/", (req, res) => {
  res.send("got to GET /wiki/");
});

module.exports = {
  router
};
