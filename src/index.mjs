import express from "express";
import userRouter from "./routes/users.mjs";
import productRouter from "./routes/products.mjs";

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(productRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.status(200).send("Hello, world!");
});
