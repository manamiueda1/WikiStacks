const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

const Page = db.define("page", {
  //   name: {
  //     type: Sequelize.STRING,
  //     allowNull: false
  //   },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});

Page.beforeValidate(instance => {
  let slug = instance.title.replace(/\s+/g, "_").replace(/\W/g, "");
  instance.slug = slug;
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validte: {
      isEmail: true
    }
  }
});

module.exports = {
  db,
  Page,
  User
};
