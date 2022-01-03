import axios from "axios";

export const getLocations = async () => {
  try {
    const locations = (await axios.get(`/api/locations/`)).data.found;
    return locations ?? [];
  } catch (error) {
    console.log(error);
  }
  return [];
};
