import { query } from "../../app.js";

const queryGetRentals = (filter) => {
  console.log("filter", filter);
  let query = `SELECT * FROM \`rentals\` JOIN \`cars\` ON rentals.CarId=cars.CarId JOIN \`car_models\` ON cars.ModelId=car_models.ModelId`;
  let where = ` WHERE`;
  let usedWhere = false;
  if (filter.userId) {
    usedWhere = true;
    where += ` UserId='${filter.userId}'`;
  }

  if (usedWhere) {
    query += where;
  }

  console.log("Query rentals", query);
  return query;
};

export const getRentalsByUserId = async (userId) => {
  return await query(queryGetRentals({ userId }));
};
