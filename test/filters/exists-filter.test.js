const { ExistsFilter } = require("../../src/filters");
const { Task } = require("../mock");

describe("ExistsFilter", () => {
  it("apply", () => {
    const query = Task.find();
    const filter = new ExistsFilter(["status"]);

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
        }
      }
    });

    const expected = { status: { $exists: true } };

    expect(query._conditions.hasOwnProperty("stacked")).toBeFalsy();
    expect(query._conditions.hasOwnProperty("closed")).toBeFalsy();
    expect(query._conditions.hasOwnProperty("closedAt")).toBeFalsy();

    expect(query._conditions.hasOwnProperty("status")).toBeTruthy();
    expect(query._conditions).toEqual(expected);

    /** @todo Add advanced tests here */
  });
});
