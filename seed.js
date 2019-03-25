const { Blog, Tag, Student, ContactInfo, Author, Book } = require("./models");

const createBlogsAndTags = async () => {
  const tag1 = await Tag.create({ name: "Technology" });

  const blog1 = await Blog.create(
    {
      name: "Rails Cast Blog",
      tags: [{ name: "Ruby on Rails" }]
    },
    { include: [Tag] }
  );
  
  const blog2 = await Blog.create(
    {
      name: "React Tips and Tricks",
      tags: [{ name: "React" }]
    },
    { include: [Tag] }
  );

  await blog1.addTag(tag1);
  await blog2.addTag(tag1);
};

const createStudentsAndContactInfo = async () => {
  await Student.create(
    {
      name: "Deborah R Marrero",
      contactinfo: {
        address: "226 Ferguson Street 12244"
      }
    },
    { include: [ContactInfo] }
  );

  await Student.create(
    {
      name: "Kyle Simpson",
      contactinfo: {
        address: "2773 Henry Ford Avenue 23422"
      }
    },
    { include: [ContactInfo] }
  );
};

const createAuthorsAndBooks = async () => {
  await Author.create(
    {
      name: "George Orwell",
      books: [
        { title: "Animal Farm" },
        { title: "1984" },
        { title: "Homage to Catalonia" },
        { title: "The Road to Wigan Pier" }
      ]
    },
    { include: [Book] }
  );

  await Author.create(
    {
      name: "Aldous Huxley",
      books: [{ title: "Brave New World" }]
    },
    { include: [Book] }
  );

  await Author.create(
    {
      name: "Ray Bradbury",
      books: [{ title: "Fahrenheit 451" }]
    },
    { include: [Book] }
  );
};

module.exports = {
  createStudentsAndContactInfo,
  createAuthorsAndBooks,
  createBlogsAndTags
};
