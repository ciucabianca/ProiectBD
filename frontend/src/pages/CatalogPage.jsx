import { CarCard } from "../components/CarCard";
import { Layout } from "../components/Layout";

const carDetails = {
  manufacturer: "Bmw",
  type: "Sedan",
  fabricationYear: 2020,
  color: "black",
  automated: true,
  licensePlate: "B 873 BMW",
  numberOfKm: 10000,
  pricePerDay: 100,
  images: [
    "https://www.glasul.md/wp-content/uploads/2021/10/1280x854_P90351044_highRes_the-new-bmw-8-series.jpg",
    "https://www.auto-data.net/images/f18/BMW-8-Series-Gran-Coupe-G16.jpg",
  ],
};

export const CatalogPage = () => {
  return (
    <Layout>
      <h1>Catalog Page</h1>
      <CarCard carDetails={carDetails} />
    </Layout>
  );
};
