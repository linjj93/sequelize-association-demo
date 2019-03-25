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
    test("getTags() returns Blog's Tags", async () => {
      const blog1 = await Blog.findOne({
        where: { name: "Rails Cast Blog" }
      });
      const tags = await blog1.getTags();
      expect(tags[0].name).toEqual("Technology");
      expect(tags[1].name).toEqual("Ruby on Rails");
    });

    test("setTags() updates the Blog's tags", async () => {
      const blog1 = await Blog.findOne({
        where: { name: "Rails Cast Blog" }
      });
      const newTag = await Tag.create({
        name: "A new tag"
      });
      await blog1.setTags([newTag]);
      const updatedTags = await blog1.getTags();

      expect(await blog1.countTags()).toEqual(1);
      expect(updatedTags[0].name).toEqual("A new tag");
    });
  });

  describe("Tag hasMany Blog", () => {
    test("getBlogs() returns Blogs associated to Tag", async () => {
      const tag1 = await Tag.findOne({
        where: { name: "React" }
      });
      const blogs = await tag1.getBlogs();

      expect(await tag1.countBlogs()).toEqual(1);
      expect(blogs[0].name).toEqual("React Tips and Tricks");
    });

    test("setBlogs() updates Blogs associated to Tag", async () => {
      const tag1 = await Tag.findOne({
        where: { name: "React" }
      });

      const newBlog = await Blog.create({ name: "React Debugging" });
      await tag1.setBlogs([newBlog]);
      const updatedBlogs = await tag1.getBlogs();

      expect(await tag1.countBlogs()).toEqual(1);
      expect(updatedBlogs[0].name).toEqual("React Debugging");
    });

    test("createBlog() creates a Blog and updates Blog associated to Tag", async () => {
      const tag1 = await Tag.findOne({
        where: { name: "React" }
      });

      await tag1.createBlog({ name: "React Daily" });
      const updatedBlogs = await tag1.getBlogs();
      expect(updatedBlogs[0].name).toEqual("React Debugging");
      expect(updatedBlogs[1].name).toEqual("React Daily");
    });
  });
});
