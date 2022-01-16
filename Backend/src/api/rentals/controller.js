import { query } from "../../app.js";
import { v4 as uuid } from "uuid";

const queryGetRentals = (filter) => {
  let query = `SELECT * FROM \`rentals\`
              JOIN \`cars\` ON rentals.CarId=cars.CarId
              JOIN \`car_models\` ON cars.ModelId=car_models.ModelId
              JOIN \`locations\` ON cars.LocationId=locations.LocationId`;
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
  if (filter.carId) {
    usedWhere = true;
    where += ` rentals.CarId='${filter.carId}'`;
  }

  if (usedWhere) {
    query += where;
  }

  console.log("Query rentals", query);
  return query;
};

const queryPostRental = (rental) => {
  const query = `INSERT INTO \`rentals\`
                (\`RentalId\`, \`CarId\`, \`UserId\`, \`LocationId\`, \`StartDate\`, \`EndDate\`, \`TotalPrice\`)
                VALUES ('${rental.rentalId}', '${rental.carId}', '${rental.userId}', '${rental.locationId}', '${rental.startDate}', '${rental.endDate}', '${rental.totalPrice}');`;

  console.log("Query create rental", query);
  return query;
};

const queryUpdateRental = (rentalId, start, end) => {
  const query = `UPDATE \`rentals\`
                SET rentals.StartDate='${start}', rentals.EndDate='${end}'
                WHERE rentals.RentalID='${rentalId}'`;

  console.log("Query update rental", query);
  return query;
};

const queryDeleteRental = (rentalId) => {
  const query = `DELETE FROM \`rentals\` WHERE rentals.RentalID='${rentalId}'`;

  console.log("Query delete rental", query);
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

export const createRental = async (rental) => {
  rental.rentalId = uuid();
  rental.startDate = new Date(rental.startDate * 1000).toISOString();
  rental.endDate = new Date(rental.endDate * 1000).toISOString();
  console.log("rental", rental);
  const res = await query(queryPostRental(rental));
  return { res };
};

export const updateRental = async (rentalId, { start, end }) => {
  const startDate = new Date(start * 1000).toISOString();
  const endDate = new Date(end * 1000).toISOString();
  const res = await query(queryUpdateRental(rentalId, startDate, endDate));
  console.log(rentalId, start, end);
  return { res };
};

export const deleteRental = async (rentalId) => {
  await query(queryDeleteRental(rentalId));
};
