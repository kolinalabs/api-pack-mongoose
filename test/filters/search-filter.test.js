const { SearchFilter } = require("../../src/filters");
const { Task } = require("../mock");

describe("OrderFilter", () => {
  it("apply", () => {
    const query = Task.find();
    const filter = new SearchFilter(["title", "status"]);

    expect(Object.keys(filter.properties).length).toBe(2);

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
        },
        title: "foo",
        status: "pending"
      }
    });

    const expected = {
      status: { $regex: new RegExp("^pending$") },
      title: { $regex: new RegExp("^foo$") }
    };

    expect(Object.keys(query._conditions).length).toBe(2);
    expect(query._conditions).toEqual(expected);

    /** @todo Add advanced tests here */
  });
});
