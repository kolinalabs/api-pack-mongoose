const { Contact, Project, Task } = require("./mock");

const OperationFactory = require("../src/operation-factory");

describe("OperationFactory", () => {
  it("SingleModel", () => {
    const operations = OperationFactory.create(Task);

    expect(operations.length).toBe(5);

    const paginate = operations[0];
    expect(paginate.type).toBe("collection");
    expect(paginate.path).toBe("/tasks");
    expect(paginate.method).toBe("get");

    const create = operations[1];
    expect(create.type).toBe("collection");
    expect(create.path).toBe("/tasks");
    expect(create.method).toBe("post");

    const retrieve = operations[2];
    expect(retrieve.type).toBe("item");
    expect(retrieve.path).toBe("/tasks/:id");
    expect(retrieve.method).toBe("get");

    const update = operations[3];
    expect(update.type).toBe("item");
    expect(update.path).toBe("/tasks/:id");
    expect(update.method).toBe("put");

    const remove = operations[4];
    expect(remove.type).toBe("item");
    expect(remove.path).toBe("/tasks/:id");
    expect(remove.method).toBe("delete");
  });

  it("ArrayModels", () => {
    const operations = OperationFactory.create([Project, Task]);
    expect(operations.length).toBe(10);
  });

  it("ConfiguredModel", () => {
    const operations = OperationFactory.create(Contact);
    const operation = operations[0];

    expect(operation.path).toBe("/custom-contacts");
    expect(operations.length).toBe(3);

    expect(operations[0].type).toBe("collection");
    expect(operations[1].type).toBe("item");
    expect(operations[2].type).toBe("collection");
  });
});
