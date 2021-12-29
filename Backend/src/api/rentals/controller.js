import { query } from "../../app.js";

const queryGetRentalsByUserId = (userId) => {
  return `SELECT Manufacturer,Type,FabricationYear, Color, StartDate, EndDate, Image FROM \`rentals\` JOIN \`cars\` ON rentals.CarId=cars.CarId JOIN \`car_models\` ON cars.ModelId=car_models.ModelId WHERE UserId="${userId}"`;
};

export const getRentalsByUserId = async (userId) => {
  return await query(queryGetRentalsByUserId(userId));
};
