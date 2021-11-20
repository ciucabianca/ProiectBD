import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { configApi } from "./api.js";
import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "CarsOnDemand",
});

export const configApp = () => {
  db.connect((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("MySQL Connected...");
    }
  });

  const app = express();

  app.use(compression());
  app.use(cors({ origin: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/api", configApi());

  return app;
};
