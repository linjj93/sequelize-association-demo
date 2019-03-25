const { Author, Book, sequelize } = require("../../models");
const { createAuthorsAndBooks } = require("../../seed");

describe("One to Many Association", () => {
  const printMagicMethods = modelInstance => {
    console.log(Object.keys(modelInstance.__proto__));
  };

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Book belongsTo Author", () => {
    beforeAll(async () => {
      await sequelize.sync({ force: true });
      await createAuthorsAndBooks();
    });

    test("getAuthor() returns books's author", async () => {});

    test("setAuthor() updates the book's Author", async () => {});
  });

  describe("Author hasMany Student", () => {
    beforeAll(async () => {
      await sequelize.sync({ force: true });
      await createAuthorsAndBooks();
    });

    test("getBooks() returns list of books associated to Author", async () => {});

    test("countBooks() returns number of books associated to Author", async () => {});

    test("hasBook() returns true if Author has book of id", async () => {});

    test("hasBooks() returns true if Author has books of ids", async () => {});

    test("setBooks() updates all books associated to author", async () => {});

    test("addBooks() adds multiple books to author", async () => {});

    test("removeBooks() remove selected bookids associated to author", async () => {});
  });
});
