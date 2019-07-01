module.exports = (sequelize, type) => {
  const Student = sequelize.define(
    "student",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      name: type.STRING
    },
    { timestamps: false }
  );

  Student.associate = models => {
    //key association here
    Student.hasOne(models.ContactInfo);
  };

  return Student;
};
