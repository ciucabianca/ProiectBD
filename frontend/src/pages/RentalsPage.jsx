import { useEffect, useState } from "react";
import { RentalCard } from "../components/RentalCard";
import { getRentalsByUserId } from "../api/rentals";
import { getUser } from "../api/users";
import { Layout } from "../components/Layout";
import { LoadingOutlined } from "@ant-design/icons/lib/icons";

export const RentalsPage = () => {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getRentals();
  }, []);

  const getRentals = async () => {
    setIsLoading(true);
    const user = await getUser();
    const rentals = await getRentalsByUserId(user.userId);
    setRentals(rentals);
    setIsLoading(false);
  };

  return (
    <Layout>
      <h1>Rentals Page</h1>
      {isLoading ? (
        <LoadingOutlined className="h3 m-3" />
      ) : (
        rentals.map((rental) => {
          return <RentalCard rental={rental} />;
        })
      )}
    </Layout>
  );
};
