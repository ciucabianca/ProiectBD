import { Router } from "express";
import { findCars } from "./controller.js";

export const carsRouter = Router();

carsRouter.get("/", async (req, res) => {
  const options = {
    page: parseInt(req.query.page) || 1,
    size: parseInt(req.query.size) || 50,
    filter: req.query.filter || {},
  };
  const found = await findCars(options);
  return res.status(200).json({ success: "Query successful", found });
});
