import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "muhammad", displayName: "Muhammad" },
  { id: 2, username: "bilal", displayName: "Bilal" },
  { id: 3, username: "asad", displayName: "Asad" },
];

app.get("/", (require, response) => {
  response.status(201).send("hello world");
});

app.get("/api/users", (request, response) => {
  response.send(mockUsers);
});

app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parsedId(request.params.id);
  console.log(parsedId);
});

app.get("/api/product", (request, response) => {
  response.send({
    id: 1,
    name: "computer",
    type: "LapTop",
  });
});

app.listen(PORT, () => {
  console.log(`Running  on port ${PORT}`);
});
