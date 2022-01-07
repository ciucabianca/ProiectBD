import { Layout } from "../components/Layout";
import { useParams } from "react-router-dom";

export const RentPage = () => {
  const { carId } = useParams();

  return (
    <Layout>
      <h1>{`Rent Page ${carId}`}</h1>
    </Layout>
  );
};
