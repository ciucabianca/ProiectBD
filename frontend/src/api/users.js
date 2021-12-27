import axios from "axios";

export const loginAction = async (credentials) => {
  try {
    console.log(credentials);
    const res = await axios.post("/api/users/login", credentials);
    console.log(res);
    if (res.data) {
      localStorage.setItem("authToken", res.data.token);
      return res.data.token;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export const registerAction = async ({
  email,
  password,
  lastName,
  firstName,
}) => {
  try {
    const res = await axios.post("/api/users/register", {
      email,
      password,
      lastName,
      firstName,
    });
    if (res.data) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getUser = async () => {
  try {
    const res = await axios.get("/api/users/me", {
      headers: { Authorization: `bearer ${localStorage.authToken}` },
    });
    return res.data;
  } catch {
    console.log("error");
  }
  return undefined;
};
