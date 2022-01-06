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
  if (filter.startDate && filter.endDate) {
    const startDate = new Date(filter.startDate * 1000).toISOString();
    const endDate = new Date(filter.endDate * 1000).toISOString();
    usedWhere = true;
    where += ` (NOT (rentals.StartDate > '${endDate}' OR rentals.EndDate < '${startDate}'))`;
  }

  if (usedWhere) {
    query += where;
  }

  console.log("Query rentals", query);
  return query;
};

export const findRentals = async (filter) => {
  const res = await query(queryGetRentals(filter));
  const formated = res.map((rowDataPacket) => {
    return {
      ...rowDataPacket,
      StartDate: rowDataPacket.StartDate / 1000,
      EndDate: rowDataPacket.EndDate / 1000,
    };
  });

  return formated;
};
