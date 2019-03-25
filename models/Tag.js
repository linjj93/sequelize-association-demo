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
    //key association here
  };

  return Tag;
};
