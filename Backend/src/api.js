import Router from "express";
import { rentalsRouter } from "./api/rentals/router.js";
import { usersRouter } from "./api/users/router.js";

export const configApi = () => {
  const mainRouter = Router();

  mainRouter.use("/users", usersRouter);
  mainRouter.use("/rentals", rentalsRouter);

  return mainRouter;
};
