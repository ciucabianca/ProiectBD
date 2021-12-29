import axios from "axios";

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
