import { query } from "../../app.js";
import { findRentals } from "../rentals/controller.js";

const queryGetCars = (filter) => {
  console.log("filter", filter);
  let query = `SELECT * FROM \`cars\` JOIN \`car_models\` ON cars.ModelId=car_models.ModelId`;
  let where = ` WHERE`;
  let usedWhere = false;
  if (filter.locationId && filter.locationId.length > 0) {
    usedWhere = true;
    where += ` LocationId='${filter.locationId}'`;
  }
  if (filter.carId) {
    usedWhere = true;
    where += ` CarId='${filter.carId}'`;
  }

  if (usedWhere) {
    query += where;
  }

  console.log("Query cars", query);
  return query;
};

export const findCars = async (options) => {
  const filter = JSON.parse(options.filter);

  let rentedCarIds = [];
  if (filter.startDate && filter.endDate) {
    const resRentals = await findRentals({
      startDate: filter.startDate,
      endDate: filter.endDate,
    });

    const carRentedIds = resRentals.map((rental) => rental.CarId);
    rentedCarIds = carRentedIds.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
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

  return formated;
};
