import { query } from "../../app.js";

const queryGetCars = (filter) => {
  let query = `SELECT * FROM \`cars\` JOIN \`car_models\` ON cars.ModelId=car_models.ModelId`;
  let where = ` WHERE`;
  let usedWhere = false;
  if (filter.locationId && filter.locationId.length > 0) {
    usedWhere = true;
    where += ` LocationId='${filter.locationId}'`;
  }

  if (usedWhere) {
    query += where;
  }

  console.log("Query cars", query);
  return query;
};

export const find = async (options) => {
  const filter = JSON.parse(options.filter);
  console.log("filter", filter);

  let rentedCarIds = [];
  if (filter.startDate && filter.endDate) {
  }

  const res = await query(queryGetCars(filter));
  const formated = res
    .filter((rowDataPacket) => !rentedCarIds.includes(rowDataPacket.CarId))
    .map((rowDataPacket) => {
      return {
        ...rowDataPacket,
        Automated: !!rowDataPacket.Automated,
        Images: rowDataPacket.Images.split(" "),
      };
    });

  console.log("formated", formated);

  return formated;
};
