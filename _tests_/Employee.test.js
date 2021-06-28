const employee = require("../lib/employee.js");

describe("employee", () => {
  it("should return a new employee object", () => {
    const name = "name";
    const id = "id";
    const email = "email";
    const obj = new employee(name, id, email);
    expect(typeof obj === "object");
  });

  it("should return Employee when calling getRole method", () => {
    const name = "name";
    const id = "id";
    const email = "email";
    const obj = new employee(name, id, email);
    expect(obj.getRole()).toEqual("Employee");
  });

  it("should return email when calling getEmail method", () => {
    const name = "name";
    const id = "id";
    const email = "email";
    const obj = new employee(name, id, email);
    expect(obj.getEmail()).toEqual(email);
  });

  it("should return id when calling getId method", () => {
    const name = "name";
    const id = "id";
    const email = "email";
    const obj = new employee(name, id, email);
    expect(obj.getId()).toEqual(id);
  });

  it("should return name when calling getId method", () => {
    const name = "name";
    const id = "id";
    const email = "email";
    const obj = new employee(name, id, email);
    expect(obj.getName()).toEqual(name);
  });
});
