import { Router } from "express";
import {
  create,
  deleteUser,
  getUserById,
  login,
  updateUser,
} from "./controller.js";
import validateParams from "../../middleware/validateParams.js";
import { check } from "express-validator";
import { validateAuth } from "../../helpers/validateAuth.js";

export const usersRouter = Router();

usersRouter.get("/me", validateAuth(["user"]), async (req, res) => {
  console.log(req.user);
  return res.status(200).json(req.user);
});

usersRouter.get("/:_userId", validateAuth(["user"]), async (req, res) => {
  try {
    const user = await getUserById(req.params._userId);
    return res.status(200).json(user);
  } catch (err) {
    console.log("error", err);
    return res.status(500).send("Internal Server Error");
  }
});

usersRouter.post(
  "/login",
  [
    check("email", "Empty email field").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Empty password field").not().isEmpty(),
    check("password", "Password must be between 5-30 characters").isLength({
      min: 5,
      max: 30,
    }),
  ],
  validateParams,
  async (req, res) => {
    try {
      const token = await login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      if (error === "not found") {
        return res.status(404).json({ msg: "user not found" });
      }
      if (error === "password mismatch") {
        return res
          .status(403)
          .json({ msg: "Invalid email and password combination" });
      }
      return res.status(500).send("Internal Server Error");
    }
  }
);

usersRouter.post(
  "/register",
  [
    check("email", "Empty email field").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Empty password field").not().isEmpty(),
    check("password", "Password must be between 5-30 characters").isLength({
      min: 5,
      max: 30,
    }),
    check("lastName", "Empty name field").not().isEmpty(),
    check("firstName", "Empty name field").not().isEmpty(),
  ],
  validateParams,
  async (req, res) => {
    try {
      const user = await create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      if (error === "duplicated") {
        return res.status(409).send("User with this email already exists");
      }
      return res.status(500).send("Internal Server Error");
    }
  }
);

usersRouter.put("/:_userId", async (req, res) => {
  try {
    const user = await updateUser(req.params._userId, req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

usersRouter.delete("/:_userId", async (req, res) => {
  try {
    await deleteUser(req.params._userId);
    return res.status(204).send("Succesfully deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});
