import { query } from "../../app.js";

const queryGetAllLocations = () => {
  return `SELECT * FROM \`locations\``;
};

export const find = async (options) => {
  return await query(queryGetAllLocations());
};
