const { DateFilter } = require("../../src/filters");
const { Task } = require("../mock");

describe("DateFilter", () => {
  it("apply", () => {
    const query = Task.find();
    const filter = new DateFilter(["closedAt", "openedAt"]);

    expect(filter.properties.length).toBe(2);

    filter.apply(query, {
      filters: {
        closed: "no",
        stacked: true,
        closedAt: {
          after: "2019-04-05"
        }
      }
    });

    expect(query._conditions.hasOwnProperty("stacked")).toBeFalsy();
    expect(query._conditions.hasOwnProperty("closed")).toBeFalsy();

    expect(query._conditions.hasOwnProperty("closedAt")).toBeTruthy();

    /** @todo Add advanced tests here */
  });
});
