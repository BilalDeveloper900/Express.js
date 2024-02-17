import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.header.cookie);
  console.log(request.cookies);
  response.send({
    id: 1,
    name: "computer",
    type: "Laptop",
  });
});

export default router;
