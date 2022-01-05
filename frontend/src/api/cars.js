import axios from "axios";

export const getCars = async (filter) => {
  console.log("filter", filter);
  try {
    const cars = (
      await axios.get(`/api/cars/`, {
        params: { filter },
      })
    ).data.found;
    console.log("cars", cars);
    return cars ?? [];
  } catch (error) {
    console.log(error);
  }
  return [];
};
