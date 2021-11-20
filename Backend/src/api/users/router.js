import { Router } from "express";
import { db } from "../../app.js";

export const usersRouter = Router();

usersRouter.post("/login", async (req, res) => {
  res.status(200).send("post user");
});

usersRouter.post("/register", async (req, res) => {
  res.status(200).send("post user");
});
