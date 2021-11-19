import Router from "express";
import { authRouter } from "./auth/router.js";

export const configApi = () => {
  const mainRouter = Router();

  mainRouter.use("/auth", authRouter);

  return mainRouter;
};
