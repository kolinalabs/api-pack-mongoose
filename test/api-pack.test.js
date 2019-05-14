const { ApiPack } = require("../src");
const AbstractFilter = require("../src/filters/abstract-filter");

describe("ApiPack", () => {
  it("Default", () => {
    const apiPack = new ApiPack();

    expect("function").toBe(typeof apiPack.routing);
  });

  it("Extensions", () => {
    const apiPack = new ApiPack();

    expect(apiPack.getOperationProvider().extensions.length).toBe(2);

    const MyInvalidExtension = {
      // Without apply() function
    };

    expect(() => {
      apiPack.addExtension(MyInvalidExtension);
    }).toThrowError("Invalid extension.");

    const MyCustomExtension = {
      apply(query, operation) {
        // My custom logic here
        query.customExtensionWorking = true;
      }
    };

    apiPack.addExtension(MyCustomExtension);
    expect(apiPack.getOperationProvider().extensions.length).toBe(3);
  });

  it("Filters", () => {
    const apiPack = new ApiPack();

    const filterExtension = apiPack.getFilterExtension();

    expect(Object.keys(filterExtension.filters).length).toBe(7);

    class MyCustomFilter extends AbstractFilter {
      apply() {
        // My custom filter apply
      }
    }

    apiPack.addFilter("custom", MyCustomFilter);

    expect(Object.keys(filterExtension.filters).length).toBe(8);
  });
});
