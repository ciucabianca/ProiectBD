import { useEffect } from "react";
import { getUser } from "../api/users";
import { Layout } from "../components/Layout";
import axios from "axios";

export const RentalsPage = () => {
  useEffect(() => {
    console.log("in use effect", axios.defaults.headers.common);
    getUserAsync();
  }, []);

  const getUserAsync = async () => {
    const user = await getUser();
    console.log(user);
  };
  return (
    <Layout>
      <h1>Rentals Page</h1>
    </Layout>
  );
};
