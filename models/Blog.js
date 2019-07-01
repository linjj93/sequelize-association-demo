module.exports = (sequelize, type) => {
  const Blog = sequelize.define(
    "blog",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      name: type.STRING
    },
    { timestamps: false }
  );

  Blog.associate = models => {
    //key association here
    Blog.belongsToMany(models.Tag, { through: "blog_tag" });
  };

  return Blog;
};
