import { query } from "../../app.js";

const queryGetRentalsByUserId = (userId) => {
  return `SELECT * FROM \`rentals\` JOIN \`cars\` ON rentals.CarId=cars.CarId WHERE UserId="${userId}"`;
};

export const getRentalsByUserId = async (userId) => {
  return await query(queryGetRentalsByUserId(userId));
};
