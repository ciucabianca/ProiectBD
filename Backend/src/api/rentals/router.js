import { Router } from "express";
import { findRentals } from "./controller.js";
import { validateAuth } from "../../helpers/validateAuth.js";

export const rentalsRouter = Router();

rentalsRouter.get("/:_userId", validateAuth(["user"]), async (req, res) => {
  const rentals = await findRentals({ userId: req.params._userId });
  return res.status(200).json(rentals);
});
