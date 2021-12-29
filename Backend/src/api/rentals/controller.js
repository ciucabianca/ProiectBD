import { query } from "../../app.js";

const queryGetRentalsByUserId = (userId) => {
  return `SELECT * FROM \`rentals\` WHERE UserId="${userId}"`;
};

export const getRentalsByUserId = async (userId) => {
  return await query(queryGetRentalsByUserId(userId));
};
