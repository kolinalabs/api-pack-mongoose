const { AbstractFilter } = require("../../src/filters");

describe("AbstractFilter", () => {
  it("Error on directly instance", () => {
    expect(() => {
      new AbstractFilter();
    }).toThrowError();
  });
});
