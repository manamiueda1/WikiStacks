const express = require("express");
const app = express();
const { db } = require("./models");
const models = require("./models");

const index = require("./views/index");
const wikiRouter = require("./routes/wiki");

app.use("/wiki", wikiRouter);

db.authenticate().then(() => {
  console.log("connected to the database");
});

// app.get("/", (req, res, next) => {
//   res.send("anything");
// });

const init = async () => {
  await models.db.sync({ force: true });

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log("Listening on PORT 3000");
  });
};

init();
