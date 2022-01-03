import { useEffect } from "react";
import { getCars } from "../api/cars";
import { CarCard } from "../components/CarCard";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons/lib/icons";
import { Search } from "../components/Search";

export const CatalogPage = () => {
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    asyncGetCars();
  }, []);

  const asyncGetCars = async () => {
    console.log("get cars");
    setIsLoadingCars(true);
    const cars = await getCars();
    setCars(cars);
    setIsLoadingCars(false);
  };

  const renderCars = () => {
    if (isLoadingCars) {
      return <LoadingOutlined className="h3 m-3" />;
    } else {
      return cars.map((car) => <CarCard carDetails={car} />);
    }
  };

  return (
    <Layout>
      <h1>Catalog Page</h1>
      <Search
        onLocationChange={(d) => {
          console.log(d);
        }}
      />
      {renderCars()}
    </Layout>
  );
};
