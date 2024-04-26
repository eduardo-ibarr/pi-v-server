import "express-async-errors";
import express from "express";

const app = express();

import usersRoutes from "./modules/users/http/routes/users-route";
import { handleErrors } from "./app/middlewares/handle-errors";
import { Environment } from "./providers/environment/env-variables";

app.use(express.json());
app.use(handleErrors);
app.use("/users", usersRoutes);

const environment = new Environment();

app.listen(environment.PORT, () => {
  console.log(`Server is running on http://localhost:${environment.PORT}`);
});
