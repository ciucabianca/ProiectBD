import { Router } from "express";
import { getRentalsByUserId } from "./controller.js";
import { validateAuth } from "../../helpers/validateAuth.js";

export const rentalsRouter = Router();

rentalsRouter.get("/:_userId", validateAuth(["user"]), async (req, res) => {
  console.log("here");
  const rentals = await getRentalsByUserId(req.params._userId);
  console.log(rentals);
  return res.status(200).json(rentals);
});
