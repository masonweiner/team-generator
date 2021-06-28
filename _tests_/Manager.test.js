const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("this is to test the manager input", () => {
    it("should output name, id, email, and office number", () => {
      const name = "nick";
      const id = 1234;
      const email = "nick@yahoo.com";
      const officeNumber = "303";

      const obj = new Manager(name, id, email, officeNumber);

      expect(obj.getName()).toEqual(name);
      expect(obj.getId()).toEqual(id);
      expect(obj.getEmail()).toEqual(email);
      expect(obj.getOfficeNumber()).toEqual(officeNumber);
    });
  });
});
