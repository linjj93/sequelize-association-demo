const { Student, ContactInfo, sequelize } = require("../../models");

describe("One to One Association", () => {
  beforeAll(async ()=> {
    await sequelize.sync({force: true});
  });

  afterAll(async ()=> {
    await sequelize.close();
  });

  const printMagicMethods = (modelInstance) => {
    console.log(Object.keys(modelInstance.__proto__));
  } 

  describe("Student hasOne ContactInfo", () => {

    test("getContactInfo() returns student's contactInfo", async () => {
     
    });

    test("setContactInfo() updates the student's contactInfo", async () => {
     
    });
  })

  describe("ContactInfo belongsTo Student", () => {
    test("getStudent() returns student associated to contactInfo", async () => {
    
    });

    test("setStudent() updates student associated to contactInfo", async () => {
      
    });

    test("createStudent() creates a student and updates student associated to contactInfo", async () => {
     
    });
  })
});
