import { Router } from "express";
import { find } from "./controller.js";

export const locationsRouter = Router();

locationsRouter.get("/", async (req, res) => {
  console.log("get locations");
  const options = {
    page: parseInt(req.query.page) || 1,
    size: parseInt(req.query.size) || 50,
    filter: req.query.filter || {},
  };
  const found = await find(options);
  return res.status(200).json({ success: "Query successful", found });
});
