import express from "express";

const app = express();
app.use(express.json());

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

// POST new user route
app.post("/api/users", (request, response) => {
  const { body } = request;
  const newUser = { id: mockUsers.length + 1, ...body };
  mockUsers.push(newUser);
  response.status(201).send(newUser);
});

// GET user by ID route
app.get("/api/users/:id", (request, response) => {
  const userId = parseInt(request.params.id);
  const user = mockUsers.find((user) => user.id === userId);
  if (!user) {
    return response.status(404).send({ error: "User not found" });
  }
  response.send(user);
});

// Sample product route
app.get("/api/product", (request, response) => {
  response.send({
    id: 1,
    name: "computer",
    type: "Laptop",
  });
});

// Server listening on defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

app.delete("/api/users/:id", (request, response) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});
