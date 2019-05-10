require("dotenv").config();

const { Provider } = require("../../src/api-pack");
const mongoose = require("mongoose");
const { Task } = require("../mock");

const taskData = [
  {
    title: "Task one",
    status: "pending",
    priority: 5
  },
  {
    title: "Task two",
    status: "closed",
    priority: 10
  },
  {
    title: "Task three",
    status: "locked",
    priority: 8
  }
];

describe("Provider", () => {
  let conn;
  let task1, task2, task3;

  beforeAll(async () => {
    conn = await mongoose.connect(process.env.API_PACK_MONGO, {
      useNewUrlParser: true
    });

    task1 = await Task.create(taskData[0]);
    task2 = await Task.create(taskData[0]);
    task3 = await Task.create(taskData[0]);
  });

  afterAll(async () => {
    await task1.remove();
    await task2.remove();
    await task3.remove();
  });

  it("getCollection", async () => {
    const operation = {
      resource: Task
    };

    await Provider.getCollection(operation);

    expect(operation.data.length).toBe(3);
  });

  it("getItem", async () => {
    const operation = {
      resource: Task,
      identifiers: {
        id: task2._id
      },
      data: null
    };

    await Provider.getItem(operation);
    expect(operation.data.toObject()).toEqual(task2.toObject());
  });

  it("getInstance", async () => {
    const operation = {
      resource: Task,
      data: null
    };

    await Provider.getInstance(operation);

    expect(operation.data).toBeInstanceOf(Task);
  });
});
