const { Blog, Tag, sequelize } = require("../../models");
const { createBlogsAndTags } = require("../../seed");

describe("Many to Many Association", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await createBlogsAndTags();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  const printMagicMethods = modelInstance => {
    console.log(Object.keys(modelInstance.__proto__));
  };

  describe("Blog hasMany Tag", () => {
    test.only("getTags() returns Blog's Tags", async () => {
      const blog1 = await Blog.findOne({
        where: { name: "Rails Cast Blog" }
      });

      const tags = await blog1.getTags();
      expect(tags[0].name).toEqual("Technology");
    });

    test("setTags() updates the Blog's tags", async () => {});
  });

  describe("Tag hasMany Blog", () => {
    test("getBlogs() returns Blogs associated to Tag", async () => {});

    test("setBlogs() updates Blogs associated to Tag", async () => {});

    test("createBlog() creates a Blog and updates Blog associated to Tag", async () => {});
  });
});
