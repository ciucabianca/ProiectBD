import axios from "axios";

export const getStatisticById = async (idStat) => {
  try {
    const res = await axios.get(`/api/stats/${idStat}`);
    console.log("asfasfdg", res.data);
    return res?.data?.number ?? undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
