import { Router } from "express";
import { createRental, findRentals } from "./controller.js";
import { validateAuth } from "../../helpers/validateAuth.js";

export const rentalsRouter = Router();

rentalsRouter.get("/", async (req, res) => {
  console.log("req", req.query, req.params);
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  console.log("filter", filter);
  const rentals = await findRentals(filter);
  return res.status(200).json(rentals);
});

rentalsRouter.get("/:_userId", validateAuth(["user"]), async (req, res) => {
  const rentals = await findRentals({ userId: req.params._userId });
  return res.status(200).json(rentals);
});

rentalsRouter.post("/", validateAuth(["user"]), async (req, res) => {
  if (
    !req.body.carId ||
    !req.body.userId ||
    !req.body.locationId ||
    !req.body.startDate ||
    !req.body.endDate ||
    !req.body.totalPrice
  ) {
    return res.status(400).send("bad request");
  }
  try {
    const rental = await createRental(req.body);
    return res.status(201).json(rental);
  } catch (err) {
    console.log("err", err);
    return res.status(500).send("error while updating values");
  }
});
