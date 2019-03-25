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

    test("getAuthor() returns books's author", async () => {
      const book1 = await Book.findOne({
        where: { title: "Animal Farm" }
      });
      const author = await book1.getAuthor();
      expect(author.name).toEqual("George Orwell");
    });

    test("setAuthor() updates the book's Author", async () => {
      const book1 = await Book.findOne({
        where: { title: "Animal Farm" }
      });
      const newAuthor = await Author.create({
        name: "New author"
      });
      await book1.setAuthor(newAuthor);
      const updatedAuthor = await book1.getAuthor();

      expect(updatedAuthor.name).toEqual("New author");
    });
  });

  describe("Author hasMany Student", () => {
    beforeAll(async () => {
      await sequelize.sync({ force: true });
      await createAuthorsAndBooks();
    });

    test("getBooks() returns list of books associated to Author", async () => {
      const author1 = await Author.findOne({
        where: { name: "George Orwell" }
      });
      const books = await author1.getBooks();
      const result = books.map(book => book.title);
      expect(result).toContain("Animal Farm");
      expect(result).toContain("Homage to Catalonia");
      expect(result).toContain("The Road to Wigan Pier");
      expect(result).toContain("1984");
    });

    test("countBooks() returns number of books associated to Author", async () => {
      const author = await Author.findOne({
        where: { name: "George Orwell" }
      });

      expect(await author.countBooks()).toEqual(4);
    });

    test("hasBook() returns true if Author has book of id", async () => {
      const author = await Author.findOne({
        where: { name: "George Orwell" }
      });

      expect(await author.hasBook(4)).toEqual(true);
      expect(await author.hasBook(10)).toEqual(false);
    });

    test("hasBooks() returns true if Author has books of ids", async () => {
      const author = await Author.findOne({
        where: { name: "George Orwell" }
      });

      expect(await author.hasBooks([1,2,3,4])).toEqual(true);
      expect(await author.hasBooks([4, 10])).toEqual(false);
    });

    test("setBooks() updates all books associated to author", async () => {
      const author1 = await Author.findOne({
        where: { name: "Aldous Huxley" }
      });
      const newBook = await Book.create({ title: "A new book 1" });
      await author1.setBooks([newBook]);
      const updatedBooks = await author1.getBooks();

      expect(await author1.countBooks()).toEqual(1);
      expect(updatedBooks[0].title).toEqual("A new book 1");
    });

    test("addBooks() adds multiple books to author", async () => {
      const book1 = await Book.create({ title: "A new book 2" });
      const book2 = await Book.create({ title: "A new book 3" });
      const author1 = await Author.findOne({
        where: { name: "Aldous Huxley" }
      });
      await author1.addBooks([book1, book2]);
      const updatedBooks = await author1.getBooks();
      
      const result = updatedBooks.map(book => book.title);
      
      expect(await author1.countBooks()).toEqual3;
      expect(result).toContain("A new book 1");
      expect(result).toContain("A new book 2");
      expect(result).toContain("A new book 3");
    });
  });

  test("removeBooks() remove selected bookids associated to author", async () => {
    const author1 = await Author.findOne({
      where: { name: "Aldous Huxley" }
    });
    await author1.removeBooks([7,8]);
    const updatedBooks = await author1.getBooks();

    expect(await author1.countBooks()).toEqual(1);
    expect(updatedBooks[0].title).toEqual("A new book 3");
  });
});
