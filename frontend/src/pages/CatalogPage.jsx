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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [locationId, setLocationId] = useState();

  useEffect(() => {
    asyncGetCars();
  }, []);

  const asyncGetCars = async () => {
    const filter = { startDate, endDate, locationId };
    console.log("filter", filter);
    setIsLoadingCars(true);
    const cars = await getCars(filter);
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
        onChangeDates={(startDate, endDate) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        onLocationChange={(locationId) => {
          setLocationId(locationId);
        }}
        onFind={asyncGetCars}
      />
      {renderCars()}
    </Layout>
  );
};
