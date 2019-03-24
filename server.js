const app = require("./app");
const { sequelize } = require("./models");
const {
  createStudentsAndContactInfo,
  createAuthorsAndBooks,
  createBlogsAndTags
} = require("./seed");

const port = process.env.PORT || 5555;

sequelize.sync({ force: true }).then(() => {
  createStudentsAndContactInfo(), createAuthorsAndBooks();
  createBlogsAndTags(),
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
});
