# Api Pack - Mongoose

Mongoose helpers for nodejs-api-pack

[**Official Documentation**](https://kolinalabs.github.io/nodejs-api-pack-docs/)

# Usage

## Installation

```js
// npm
$ npm install @kolinalabs/api-pack-mongoose

// or yarn
$ yarn add @kolinalabs/api-pack-mongoose
```

## Basic example (with api-pack-express)

Api pack express provides the default stack for running nodejs-api-pack with the ExpressJS framework.

```
$ yarn add @kolinalabs/api-pack-express
```

**Configure Model(s)**

```js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  status: String,
  priority: Number,
  closed: Boolean,
  openedAt: Date,
  closedAt: Date
});

const Task = mongoose.model("Task", TaskSchema);
```

**Init ApiPack**

```js
const { ApiPack } = require("@kolinalabs/api-pack-mongoose");

// Using @kolinalabs/api-pack-express router stack
const ApiPackExpress = require("@kolinalabs/api-pack-express");

const apiPack = new ApiPack([
  Task
  // other models...
]);

const routes = apiPack.routing(ApiPackExpress);

const app = express();
app.use(bodyParser.json());
app.use("/api", routes);

app.listen(3003);
```

**Access the URLs**

```
GET: http://localhost:3003/api/tasks

POST: http://localhost:3003/api/tasks

GET: http://localhost:3003/api/tasks/:id

PUT: http://localhost:3003/api/tasks/:id

DELETE: http://localhost:3003/api/tasks/:id
```

[**Other examples**](https://github.com/kolinalabs/nodejs-api-pack-samples)
