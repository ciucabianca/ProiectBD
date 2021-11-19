import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { configApi } from "./api.js";

export const configApp = () => {
  const app = express();

  app.use(compression());
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/api", configApi());

  return app;
};
