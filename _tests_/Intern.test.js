const intern = require("../lib/intern.js");

describe("intern", () => {
  it("should return a new object of intern", () => {
    const value = "Harvard";
    const obj = new intern(value);
    expect(typeof obj === "object");
  });

  it("should return intern when calling getRole method", () => {
    const obj = new intern("test");
    expect(obj.getRole()).toEqual("Intern");
  });
});
