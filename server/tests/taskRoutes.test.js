// import request from "supertest";
// import express from "express";
// import taskRoute from "../routes/taskRoutes";
// import * as taskController from "../controllers/taskController";

// const app = express();
// app.use(express.json());
// app.use("/tasks", taskRoute);

// jest.mock("../controllers/taskController");

// describe("Task Routes", () => {
//   it("should get all tasks", async () => {
//     const tasks = [
//       {
//         taskId: 1,
//         title: "Test Task",
//         description: "Test Description",
//         status: "Pending",
//         userId: 1,
//         categoryId: 1,
//       },
//     ];

//     taskController.getTasks.mockResolvedValue(tasks);

//     const response = await request(app).get("/tasks");

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ data: tasks });
//   });

//   it("should create a new task", async () => {
//     const newTask = {
//       title: "New Task",
//       description: "New Task Description",
//       status: "Pending",
//       userId: 1,
//       categoryId: 1,
//     };

//     taskController.createTask.mockResolvedValue(newTask);

//     const response = await request(app).post("/tasks/create").send(newTask);

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({
//       data: newTask,
//       message: "Task created successfully",
//     });
//   });

//   it("should get tasks by user", async () => {
//     const userTasks = [
//       {
//         taskId: 1,
//         title: "Test Task",
//         description: "Test Description",
//         status: "Pending",
//         userId: 1,
//         categoryId: 1,
//       },
//     ];

//     taskController.getUserTasks.mockResolvedValue(userTasks);

//     const response = await request(app).get("/tasks/getUserTasks");

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ data: userTasks });
//   });

//   it("should get a task by ID", async () => {
//     const task = {
//       taskId: 1,
//       title: "Test Task",
//       description: "Test Description",
//       status: "Pending",
//       userId: 1,
//       categoryId: 1,
//     };

//     taskController.getTaskById.mockResolvedValue(task);

//     const response = await request(app).get("/tasks/1");

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ data: task });
//   });

//   it("should update a task status", async () => {
//     const updatedStatus = { status: "Completed" };

//     taskController.updateTaskStatus.mockResolvedValue([1]); // [1] indicates one row updated

//     const response = await request(app)
//       .patch("/tasks/1/status")
//       .send(updatedStatus);

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       message: "Task status updated successfully",
//     });
//   });

//   it("should update a task", async () => {
//     const updatedTask = {
//       taskId: 1,
//       title: "Updated Task",
//       description: "Updated Task Description",
//       status: "In Progress",
//       userId: 1,
//       categoryId: 1,
//     };

//     taskController.updateTask.mockResolvedValue([1]);

//     const response = await request(app).put("/tasks/1").send(updatedTask);

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({
//       message: "Task updated successfully",
//     });
//   });

//   it("should delete a task", async () => {
//     taskController.deleteTask.mockResolvedValue(1); // 1 indicates the task was deleted

//     const response = await request(app).delete("/tasks/1");

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ message: "Task deleted successfully" });
//   });

//   it("should return 404 if task not found", async () => {
//     taskController.getTaskById.mockResolvedValue(null);

//     const response = await request(app).get("/tasks/999");

//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({ message: "Task not found" });
//   });

//   it("should return error if task creation fails", async () => {
//     const newTask = {
//       title: "New Task",
//       description: "New Task Description",
//       status: "Pending",
//       userId: 1,
//       categoryId: 1,
//     };

//     taskController.createTask.mockRejectedValue(new Error("Database Error"));

//     const response = await request(app).post("/tasks/create").send(newTask);

//     expect(response.status).toBe(500);
//     expect(response.body).toEqual({ message: "Failed to create task" });
//   });
// });
