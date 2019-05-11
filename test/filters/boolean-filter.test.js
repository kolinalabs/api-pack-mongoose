const { BooleanFilter } = require("../../src/filters");
const { Task } = require("../mock");

describe("BooleanFilter", () => {
  it("apply", () => {
    const query = Task.find();
    const filter = new BooleanFilter(["closed"]);

    expect(filter.properties.length).toBe(1);

    filter.apply(query, {
      filters: {
        closed: "no",
        stacked: true
      }
    });

    expect(query._conditions.hasOwnProperty("stacked")).toBeFalsy();

    expect(query._conditions.hasOwnProperty("closed")).toBeTruthy();
    expect(query._conditions.closed).toBeFalsy();
  });
});
