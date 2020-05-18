# api.task-manager
A simple task manager API using Node.js and Express.js

## How to Run

- Install Node.js and NPM.
- Install PostgreSQL and run that.
- Go to the project dir and run: `npm install`.
- Run `npm run setup` to create the config files.<br />
By default, the config file would be created using PosgresSQL driver and should use `tasks_development` as development environment database. Set the credentials and database to start the project.
- Run `npm start`to start the project.<br />
By default, the app would run using 3001 port (set the key `defaultPort` from config file if want to change the port).
- Open [http://localhost:3001/tasks/list](http://localhost:3001/tasks/list) to view the task list.

## Routes

### GET `/tasks/<id>/get`<br />
Get a task by Id.
#### GET Params
- `id` {Number} (required) - Target Id.
#### Return
- {Object} JSON Object:

`curl -X GET "http://localhost:3001/tasks/123/get"`
```
{
  "id": 123,
  "title": "foo",
  "description": "bar",
  "status": "pending"
}
```
<br />

### GET `/tasks/list`<br />
Get all active tasks.
#### Return
- Arary<{Object}> List of tasks:

`curl -X GET "http://localhost:3001/tasks/list"`
```
[
  {
    "id": 123,
    "title": "first foo",
    "description": "first bar",
    "status": "pending"
  },
  {
    "id": 124,
    "title": "second foo",
    "description": "second bar",
    "status": "pending"
  }
]
```
<br />

### POST `/tasks/create`<br />
Create a task.
#### POST Params
- `title` {String} (required) - Task title (size: 1~256).
- `description` {String} (required) - Task description (size: 1~1024).
#### Return
- {Object} New JSON object task:

`curl -X POST --data "title=foo&description=bar" "http://localhost:3001/tasks/create"`
```
{
  "id": 123,
  "title": "new foo",
  "description": "new bar",
  "status": "pending"
}
```
<br />

### PUT `/tasks/<id>/update`<br />
Update a task.
#### GET Params
- `id` {Number} (required) - Target Id.
#### POST Params
= `id` {Number} (required) - Task ID.
- `title` {String} (required) - Task title (size: 1~256).
- `description` {String} (required) - Task description (size: 1~1024).
#### Return
- {Object} Updated JSON object task:

`curl -X PUT --data "id=123&title=updated%20foo&description=updated%20bar" "http://localhost:3001/tasks/123/update"`
```
{
  "id": 123,
  "title": "updated foo",
  "description": "updated bar",
  "status": "pending"
}
```
<br />

### PUT `/tasks/<id>/update/status`<br />
Change the task status by ID.
#### GET Params
- `id` {Number} (required) - Task ID.
#### POST Params
= `id` {Number} (required) - Task ID.
- `status` {String} (required) - Task status (allowed values: ["pending", "inProgress", "done"]).
#### Return
- {Object} Updated JSON object task:

`curl -X PUT --data "id=123&status=inProgress" "http://localhost:3001/tasks/123/update/status"`
```
{
  "id": 123,
  "title": "foo",
  "description": "bar",
  "status": "inProgress"
}
```
<br />

### DELETE `/tasks/<id>/delete`<br />
Delete a task by ID.
#### GET Params
- `id` {Number} (required) - Target Id.
#### Return
- {Object} JSON Object with target ID:

`curl -X DELETE "http://localhost:3001/tasks/123/delete"`
```
{
  "id": 123
}
```
<br />
