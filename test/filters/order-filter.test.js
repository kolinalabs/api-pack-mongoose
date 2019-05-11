const { OrderFilter } = require("../../src/filters");
const { Task } = require("../mock");

describe("OrderFilter", () => {
  it("apply", () => {
    const query = Task.find();
    const filter = new OrderFilter(["priority"]);

    expect(Object.keys(filter.properties).length).toBe(1);

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
        priority: 5,
        order: {
          priority: "desc"
        }
      }
    });

    const expected = { sort: { priority: -1 } };

    expect(Object.keys(query.options.sort).length).toBe(1);
    expect(query.options).toEqual(expected);

    /** @todo Add advanced tests here */
  });
});
