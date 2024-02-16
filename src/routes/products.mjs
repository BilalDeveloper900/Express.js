import { Router } from "express";

const router = Router();

router.get("/api/product", (request, response) => {
  response.send({
    id: 1,
    name: "computer",
    type: "Laptop",
  });
});

export default router;
