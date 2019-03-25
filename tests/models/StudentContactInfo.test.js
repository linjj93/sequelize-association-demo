const { Student, ContactInfo, sequelize } = require("../../models");
const {createStudentsAndContactInfo} = require("../../seed")

describe("One to One Association", () => {
  beforeAll(async ()=> {
    await sequelize.sync({force: true});
    await createStudentsAndContactInfo();
  });

  afterAll(async ()=> {
    await sequelize.close();
  });

  const printMagicMethods = (modelInstance) => {
    console.log(Object.keys(modelInstance.__proto__));
  } 

  describe("Student hasOne ContactInfo", () => {

    test("getContactInfo() returns student's contactInfo", async () => {
      const student1 = await Student.findOne({where: {name: "Deborah R Marrero"}})
      const contactInfo = await student1.getContactinfo()
      expect(contactInfo.address).toEqual("226 Ferguson Street 12244") 
    });

    test("setContactInfo() updates the student's contactInfo", async () => {
      const student1 = await Student.findOne({where: {name: "Deborah R Marrero"}})
      const newContactInfo =  await ContactInfo.create({address: "New address"})
      await student1.setContactinfo(newContactInfo)
      const updatedContact = await student1.getContactinfo()

      expect(updatedContact.address).toEqual("New address") 
    });
  })

  describe("ContactInfo belongsTo Student", () => {
    test("getStudent() returns student associated to contactInfo", async () => {
      const contact1 = await ContactInfo.findOne({where: {address: "2773 Henry Ford Avenue 23422"}})
      const student = await contact1.getStudent()

      expect(student.name).toEqual("Kyle Simpson")
    });

    test("setStudent() updates student associated to contactInfo", async () => {
      const contact1 = await ContactInfo.findOne({where: {address: "2773 Henry Ford Avenue 23422"}})
      const newStudent = await Student.create({name: "Tom Riddle"})
      await contact1.setStudent(newStudent)
      const updatedStudent  = await contact1.getStudent()

      expect(updatedStudent.name).toEqual("Tom Riddle")
    });

    test("createStudent() creates a student and updates student associated to contactInfo", async () => {
      const contact1 = await ContactInfo.findOne({where: {address: "2773 Henry Ford Avenue 23422"}})
      await contact1.createStudent({name: "Harry Potter"})
      const updatedStudent  = await contact1.getStudent()
      expect(updatedStudent.name).toEqual("Harry Potter")
    });
  })
});
