import { Router } from "express";

export const authRouter = Router();

authRouter.get("/", async (req, res) => {
  res.status(200).send("get user");
});

authRouter.post("/", async (req, res) => {
  res.status(200).send("post user");
});
