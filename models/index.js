const Sequelize = require("sequelize");

//configure connection
const sequelize = new Sequelize("sequelize_demo", "postgres", "", {
  dialect: "postgres",
  logging: false
});

//pass the models to the connection
const models = {
  Student: sequelize.import("./Student"),
  ContactInfo: sequelize.import("./ContactInfo"),
  Book: sequelize.import("./Book"),
  Author: sequelize.import("./Author"),
  Tag: sequelize.import("./Tag"),
  Blog: sequelize.import("./Blog"),
};

//Link up all models
Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};