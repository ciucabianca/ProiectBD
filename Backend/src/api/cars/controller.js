import { query } from "../../app.js";

const queryGetAllCars = () => {
  return `SELECT * FROM \`cars\` JOIN \`car_models\` ON cars.ModelId=car_models.ModelId`;
};

export const find = async (options) => {
  const res = await query(queryGetAllCars());
  const formated = res.map((rowDataPacket) => {
    return {
      ...rowDataPacket,
      Automated: !!rowDataPacket.Automated,
      Images: rowDataPacket.Images.split(" "),
    };
  });

  return formated;
};
