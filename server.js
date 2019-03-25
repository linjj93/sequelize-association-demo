const app = require("./app");
const { sequelize } = require("./models");

const port = process.env.PORT || 5555;

sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
