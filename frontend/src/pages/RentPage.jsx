import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { useParams } from "react-router-dom";
import { DatePicker } from "../components/DatePicker";
import { CarCard } from "../components/CarCard";
import { getCars } from "../api/cars";
import { isAuth } from "../helpers/isAuth";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons/lib/icons";

export const RentPage = () => {
  const { carId } = useParams();

  const [cars, setCars] = useState([]);
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isRentingAvailable, setIsRentingAvailable] = useState(false);

  useEffect(() => {
    asyncGetCar();
  }, []);

  const asyncGetCar = async () => {
    const filter = { carId };
    setIsLoadingCars(true);
    const cars = await getCars(filter);
    setCars(cars);
    setIsLoadingCars(false);
  };

  const renderCars = () => {
    if (isLoadingCars) {
      return <LoadingOutlined className="h3 m-3" />;
    } else {
      return cars.map((car) => (
        <CarCard carDetails={car} isRenderingOffer={false} />
      ));
    }
  };

  const renderActionButton = () => {
    return (
      <div
        className={`btn p-2 mx-1 ${
          isRentingAvailable ? "btn-success" : "btn-outline-success disabled"
        }`}
        onClick={handleReservation}>
        Rezerva Acum!
      </div>
    );
  };

  const handleReservation = () => {
    console.log("rental");
  };

  return (
    <Layout>
      <h1>{`Rent Page ${carId}`}</h1>
      {renderCars()}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DatePicker
          onChangeDates={(start, end) => {
            setStartDate(start);
            setEndDate(end);
            setIsRentingAvailable(start && end);
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          {renderActionButton()}
        </div>
      </div>
    </Layout>
  );
};
