const { Student, ContactInfo, sequelize } = require("../../models");
const { createStudentsAndContactInfo } = require("../../seed");

describe("One to One Association", () => {
  const printMagicMethods = modelInstance => {
    console.log(Object.keys(modelInstance.__proto__));
  };

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await createStudentsAndContactInfo();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("Student hasOne ContactInfo", () => {
    test("getContactInfo() returns student's contactInfo", async () => {
      const student1 = await Student.findOne({
        where: { name: "Kyle Simpson" }
      });
      const contactInfo = await student1.getContactinfo();
      expect(contactInfo.address).toEqual("2773 Henry Ford Avenue 23422");
    });

    test("setContactInfo() updates the student's contactInfo", async () => {
      const student1 = await Student.findOne({
        where: { name: "Kyle Simpson" }
      });
      const newContactInfo = await ContactInfo.create({
        address: "123 ABC Street"
      });
      await student1.setContactinfo(newContactInfo);
      const updatedAddress = await student1.getContactinfo();
      expect(updatedAddress.address).toEqual("123 ABC Street");
    });
  });

  describe("ContactInfo belongsTo Student", () => {
    test("getStudent() returns student associated to contactInfo", async () => {
      const contactInfo = await ContactInfo.findOne({
        where: { address: "226 Ferguson Street 12244" }
      });
      const student = await contactInfo.getStudent();
      expect(student.name).toEqual("Deborah R Marrero");
    });

    test("setStudent() updates student associated to contactInfo", async () => {
      const contactInfo = await ContactInfo.findOne({
        where: { address: "226 Ferguson Street 12244" }
      });
      const newStudent = await Student.create({
        name: "John Cena"
      });
      await contactInfo.setStudent(newStudent);
      const updatedContactInfo = await contactInfo.getStudent();
      expect(updatedContactInfo.dataValues.name).toEqual("John Cena");
    });

    test("createStudent() creates a student and updates student associated to contactInfo", async () => {
      const contactInfo = await ContactInfo.findOne({
        where: { address: "226 Ferguson Street 12244" }
      });

      await contactInfo.createStudent({ name: "John Cena" });

      const updatedStudent = await contactInfo.getStudent();
      expect(updatedStudent.name).toEqual("John Cena");
    });
  });
});
