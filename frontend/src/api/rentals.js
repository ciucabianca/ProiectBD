import axios from "axios";
import { toast } from "react-toastify";

export const getRentals = async (filter) => {
  try {
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

export const updateRental = async (rentalId, start, end) => {
  try {
    console.log("update rental", rentalId, start, end);
    const res = await axios.put(
      `/api/rentals/${rentalId}`,
      { start, end },
      {
        headers: { Authorization: `bearer ${localStorage.authToken}` },
      }
    );
    toast.success("Update Succesful!");
  } catch (error) {
    console.log(error);
  }
};

export const deleteRental = async (rentalId) => {
  try {
    console.log("delete", rentalId);
    const res = await axios.delete(`/api/rentals/${rentalId}`, {
      headers: { Authorization: `bearer ${localStorage.authToken}` },
    });
    toast.success("Delete Succesful!");
  } catch (error) {
    console.log(error);
  }
};
