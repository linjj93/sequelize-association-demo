module.exports = (sequelize, type) => {
  const ContactInfo = sequelize.define(
    "contactinfo",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      address: type.STRING
    },
    { timestamps: false }
  );

  ContactInfo.associate = models => {
    ContactInfo.belongsTo(models.Student);
  };

  return ContactInfo;
};
