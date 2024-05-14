import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

import usersRoutes from "./modules/users/http/routes/users-route";
import authRoutes from "./modules/auth/http/routes/auth-routes";
import productsRoutes from "./modules/products/http/routes/products-route";

import { handleErrors } from "./app/middlewares/handle-errors";
import { Environment } from "./app/environment";

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

app.use(handleErrors);

app.listen(Environment.PORT, () => {
  console.log(`Server is running on http://localhost:${Environment.PORT}`);
});
