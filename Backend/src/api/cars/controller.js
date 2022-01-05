import { query } from "../../app.js";

const queryGetAllCars = (filter) => {
  let query = `SELECT * FROM \`cars\` JOIN \`car_models\` ON cars.ModelId=car_models.ModelId`;
  let where = ` WHERE`;
  let usedWhere = false;
  if (filter.locationId && filter.locationId.length > 0) {
    usedWhere = true;
    where += ` LocationId=${filter.locationId}`;
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
  const res = await query(queryGetAllCars(filter));
  const formated = res.map((rowDataPacket) => {
    return {
      ...rowDataPacket,
      Automated: !!rowDataPacket.Automated,
      Images: rowDataPacket.Images.split(" "),
    };
  });

  return formated;
};
