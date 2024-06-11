import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

import usersRoutes from "./modules/users/http/routes/users-route";
import authRoutes from "./modules/auth/http/routes/auth-routes";
import productsRoutes from "./modules/products/http/routes/products-route";
import categoriesRoutes from "./modules/categories/http/routes/categories-route";
import trackingsRoutes from "./modules/trackings/http/routes/trackings-route";

import { handleErrors } from "./app/middlewares/handle-errors";
import { Environment } from "./app/environment";

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health-check", (req, res) => {
  res
    .status(200)
    .json({
      message: "Server is running",
      timestamp: new Date(),
      status: "OK",
    });
});

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/trackings", trackingsRoutes);

app.use(handleErrors);

app.listen(Environment.PORT, () => {
  console.log(`Server is running on http://localhost:${Environment.PORT}`);
});
