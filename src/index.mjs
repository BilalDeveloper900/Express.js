import express from "express";
import { createUserValidationSchema } from "./Validation/Schema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";

const app = express();
app.use(express.json());

//.........global middle ware ..............
const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};
app.use(loggingMiddleware);

//.........resticketed middle ware ..........
const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;
  next();
};

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "muhammad", displayName: "Muhammad" },
  { id: 2, username: "bilal", displayName: "Bilal" },
  { id: 3, username: "usama", displayName: "Usama" },
  { id: 4, username: "Akbar", displayName: "Akbar" },
  { id: 5, username: "asad", displayName: "Asad" },
  { id: 6, username: "zubar", displayName: "Zubar" },
];

// Root route
app.get("/", (request, response) => {
  response.status(200).send("Hello, world!");
});

// GET users route with filtering capability
app.get("/api/users", (request, response) => {
  const { filter, value } = request.query;
  if (filter && value) {
    const filteredUsers = mockUsers.filter((user) => user[filter] === value);
    return response.send(filteredUsers);
  }
  response.send(mockUsers);
});

// GET user by ID route
app.get("/api/users/:id", (request, response) => {
  const { id } = request.params;
  const parsedId = parseInt(id);
  // Check if id is a valid number
  if (isNaN(parsedId)) {
    return response.sendStatus(400);
  }
  // Find the index of the user with the given ID
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  // If user is not found, send 404 Not Found
  if (findUserIndex === -1) {
    return response.sendStatus(404);
  }
  // If user is found, send the user data
  const findUser = mockUsers[findUserIndex];
  response.send(findUser);
});

// Server listening on defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Sample product route
app.get("/api/product", (request, response) => {
  response.send({
    id: 1,
    name: "computer",
    type: "Laptop",
  });
});

// POST new user route
app.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      return response.status(400).json({ errors: result.array() });
    }
    const userData = matchedData(request);
    const newUser = { id: mockUsers.length + 1, ...userData };
    mockUsers.push(newUser);
    response.status(201).json(newUser);
  }
);

app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});
