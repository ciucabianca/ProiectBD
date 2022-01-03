import Router from "express";
import { carsRouter } from "./api/cars/router.js";
import { locationsRouter } from "./api/locations/router.js";
import { rentalsRouter } from "./api/rentals/router.js";
import { usersRouter } from "./api/users/router.js";

export const configApi = () => {
  const mainRouter = Router();

  mainRouter.use("/users", usersRouter);
  mainRouter.use("/rentals", rentalsRouter);
  mainRouter.use("/cars", carsRouter);
  mainRouter.use("/locations", locationsRouter);

  return mainRouter;
};
