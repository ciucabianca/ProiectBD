import { Router } from "express";
import mysql from "mysql";

export const usersRouter = Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "CarsOnDemand",
});
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected...");
  }
});

usersRouter.get("/", async (req, res) => {
  try {
    db.query("SELECT * FROM `utilizatori`", (error, results, fields) => {
      if (error) {
        console.log("plm", error);
        res.status(404).send("ayaye");
      } else {
        console.log("resilts", results);
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post("/", async (req, res) => {
  res.status(200).send("post user");
});
