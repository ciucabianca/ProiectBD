import Router from "express";
import { usersRouter } from "./users/router.js";

export const configApi = () => {
  const mainRouter = Router();

  mainRouter.use("/users", usersRouter);

  return mainRouter;
};
