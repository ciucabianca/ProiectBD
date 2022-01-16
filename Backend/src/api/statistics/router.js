import { Router } from "express";
import { query } from "../../app.js";

export const statisticsRouter = Router();

const queryModelNum = () => {
  const query = `SELECT car_models.Manufacturer, car_models.Model FROM \`rentals\`
  JOIN \`cars\` ON cars.CarId=rentals.CarId
  JOIN (SELECT car_models.Manufacturer, car_models.Model, car_models.ModelId FROM  \`car_models\`) AS \`car_models\` ON cars.ModelId=car_models.ModelId
  GROUP BY rentals.CarId
  ORDER BY COUNT(rentals.CarId) DESC
  LIMIT 1`;

  console.log("Query stats model numbers", query);
  return query;
};

const queryModelSum = () => {
  const query = `SELECT car_models.Manufacturer, car_models.Model FROM \`rentals\`
  JOIN \`cars\` ON cars.CarId=rentals.CarId
  JOIN (SELECT car_models.Manufacturer, car_models.Model, car_models.ModelId FROM  \`car_models\`) AS \`car_models\` ON cars.ModelId=car_models.ModelId
  GROUP BY rentals.CarId
  ORDER BY SUM(TotalPrice) DESC
  LIMIT 1`;

  console.log("Query stats model sum", query);
  return query;
};

const queryLocationNum = () => {
  const query = `SELECT L.LocationName FROM \`rentals\` R
  JOIN \`locations\` L ON R.LocationId=L.LocationId
  GROUP BY L.LocationName
  HAVING COUNT(*) = (SELECT MAX(X.Rentals) AS RentalsMax
  FROM (SELECT rentals.LocationId, COUNT(rentals.RentalId) AS Rentals FROM \`rentals\`
  GROUP BY rentals.LocationId)X)`;

  console.log("Query stats location numbers", query);
  return query;
};

const queryLocationSum = () => {
  const query = `SELECT L.LocationName FROM \`rentals\` R
  JOIN \`locations\` L ON R.LocationId=L.LocationId
  GROUP BY L.LocationName
  HAVING SUM(R.TotalPrice) = (SELECT MAX(X.Rentals) AS RentalsMax
  FROM (SELECT rentals.LocationId, SUM(rentals.TotalPrice) AS Rentals FROM \`rentals\`
  GROUP BY rentals.LocationId)X)`;

  console.log("Query stats location sum", query);
  return query;
};

statisticsRouter.get("/:_idStats", async (req, res) => {
  let queryString = "";
  switch (req.params._idStats) {
    case "0":
      queryString = queryModelNum();
      break;
    case "1":
      queryString = queryModelSum();
      break;
    case "2":
      queryString = queryLocationNum();
      break;
    default:
      queryString = queryLocationSum();
      break;
  }

  let finalResult = "";
  if (queryString.length) {
    const result = (await query(queryString))[0];

    if (Object.keys(result).length > 1) {
      finalResult = `${result[Object.keys(result)[0]]} ${
        result[Object.keys(result)[1]]
      }`;
    } else {
      finalResult = result[Object.keys(result)[0]];
    }

    console.log("RES", result);
  }

  return res
    .status(200)
    .json({ success: "Query successful", number: finalResult });
});
