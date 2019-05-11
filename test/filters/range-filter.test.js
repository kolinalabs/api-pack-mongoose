const { RangeFilter } = require("../../src/filters");
const { Task } = require("../mock");

describe("OrderFilter", () => {
  it("apply", () => {
    const query = Task.find();
    const filter = new RangeFilter(["priority"]);

    expect(Object.keys(filter.properties).length).toBe(1);

    filter.apply(query, {
      filters: {
        closed: "no",
        stacked: true,
        priority: {
          gte: "3",
          lt: "10"
        },
        order: {
          priority: "desc"
        }
      }
    });

    const expected = { priority: { $gte: 3, $lt: 10 } };

    expect(Object.keys(query._conditions).length).toBe(1);
    expect(query._conditions).toEqual(expected);

    /** @todo Add advanced tests here */
  });
});
