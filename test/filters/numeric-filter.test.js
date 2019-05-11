const { NumericFilter } = require("../../src/filters");
const { Task } = require("../mock");

describe("NumericFilter", () => {
  it("apply", () => {
    const query = Task.find();
    const filter = new NumericFilter(["priority"]);

    expect(filter.properties.length).toBe(1);

    filter.apply(query, {
      filters: {
        closed: "no",
        stacked: true,
        closedAt: {
          after: "2019-04-05"
        },
        status: {
          exists: true
        },
        priority: 5
      }
    });

    const expected = { priority: 5 };

    expect(Object.keys(query._conditions).length).toBe(1);
    expect(query._conditions).toEqual(expected);

    /** @todo Add advanced tests here */
  });
});
