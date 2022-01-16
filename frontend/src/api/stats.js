import axios from "axios";

export const getStatisticById = async (idStat) => {
  try {
    const res = await axios.get(`/api/stats/${idStat}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
