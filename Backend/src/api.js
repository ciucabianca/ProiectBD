import Router from "express";
import { usersRouter } from "./api/users/router.js";

export const configApi = () => {
  const mainRouter = Router();

  mainRouter.use("/users", usersRouter);

  return mainRouter;
};
