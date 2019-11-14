const express = require("express");
const router = express.Router();
const wikipage = require("../views/wikipage");
const { Page, User } = require("../models");
const { addPage } = require("../views");

router.use(function(req, res, next) {
  next();
});

router.get("/", (req, res, next) => {
  res.send("got to GET /wiki/");
});

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  const user = new User({
    name: req.body.name,
    email: req.body.email
  });

  try {
    await page.save();
    await user.save();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    console.log(req.body, page);
    // wikipage(page, page.author);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
