import { Router } from "express";
import { create } from "./controller.js";
import validateParams from "../../middleware/validateParams.js";
import { check } from "express-validator";

export const usersRouter = Router();

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
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
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
    check("nume", "Empty name field").not().isEmpty(),
    check("prenume", "Empty name field").not().isEmpty(),
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
