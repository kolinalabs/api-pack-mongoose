require("dotenv").config();

const mongoose = require("mongoose");

const { Persister } = require("../../src/api-pack");
const { Project } = require("../mock");

const data = {
  title: "My Project",
  description: "Custom project",
  amount: 5000
};

describe("Persister", () => {
  let conn;

  let operation = {
    resource: Project,
    data: null
  };

  beforeAll(async () => {
    conn = await mongoose.connect(process.env.API_PACK_MONGO, {
      useNewUrlParser: true
    });
  });

  it("persist:create", async () => {
    operation.data = new Project(data);

    await Persister.persist(operation);

    expect(operation.data.title).toBe(data.title);

    const p = await Project.findById(operation.data._id);

    expect(p.toObject()).toEqual(operation.data.toObject());
  });

  it("persist:update", async () => {
    operation.data.title = "Updated Title";

    await Persister.persist(operation);

    const p = await Project.findById(operation.data._id);

    expect(p.title).toEqual("Updated Title");
  });

  it("remove", async () => {
    await Persister.remove(operation);
    expect(operation.data).toBeNull();
  });
});
