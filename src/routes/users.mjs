import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createUserValidationSchema } from "../utils/Schema.mjs";
import { resolveIndexByUserId } from "../utils/middleWare.mjs";
import { mockUsers } from "../utils/constants.mjs";
import User from "../mongoose/schemas/user.mjs";

const router = Router();

router.get("/api/users", (request, response) => {
  const { filter, value } = request.query;
  if (filter && value) {
    const filteredUsers = mockUsers.filter((user) => user[filter] === value);
    return response.send(filteredUsers);
  }
  response.send(mockUsers);
});

router.get("/api/users/:id", (request, response) => {
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

router.post("/api/users", async (request, response) => {
  const { body } = request;
  const newUser = new User(body);

  try {
    const savedUser = await newUser.save();
    return response.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    return response.sendStatus(400);
  }
});

router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;
