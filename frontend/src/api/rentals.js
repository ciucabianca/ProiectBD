import axios from "axios";

export const getRentals = async (filter) => {
  try {
    console.log("fi;ter", filter);
    const res = await axios.get(`/api/rentals`, { params: filter });
    return res.data ?? [];
  } catch (error) {
    console.log(error);
  }
};

export const getRentalsByUserId = async (userId) => {
  try {
    const res = await axios.get(`/api/rentals/${userId}`, {
      headers: { Authorization: `bearer ${localStorage.authToken}` },
    });
    return res.data ?? [];
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const createRental = async (rental) => {
  try {
    const res = await axios.post(`/api/rentals`, rental, {
      headers: { Authorization: `bearer ${localStorage.authToken}` },
    });
    return res.data ?? {};
  } catch (error) {
    console.log(error);
  }
  return [];
};
