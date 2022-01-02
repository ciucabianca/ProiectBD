import { CarCard } from "../components/CarCard";
import { Layout } from "../components/Layout";

export const CatalogPage = () => {
  return (
    <Layout>
      <h1>Catalog Page</h1>
      <CarCard carDetails={carDetails} />
    </Layout>
  );
};
