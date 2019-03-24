module.exports = (sequelize, type) => {
  const Tag = sequelize.define(
    "tag",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      name: type.STRING
    },
    { timestamps: false }
  );

  Tag.associate = models => {
    Tag.belongsToMany(models.Blog, { through: "blog_tag" });
  };

  return Tag;
};
