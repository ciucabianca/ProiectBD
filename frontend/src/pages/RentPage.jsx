import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { useParams } from "react-router-dom";
import { DatePicker } from "../components/DatePicker";
import { CarCard } from "../components/CarCard";
import { getCars } from "../api/cars";
import { useHistory } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons/lib/icons";
import { createRental, getRentals } from "../api/rentals";
import { getUser } from "../api/users";
import { toast } from "react-toastify";

export const RentPage = () => {
  const { carId } = useParams();

  const [rentals, setRentals] = useState([]);
  const [cars, setCars] = useState([]);
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [cost, setCost] = useState(0);
  const [isRentingAvailable, setIsRentingAvailable] = useState(false);

  const history = useHistory();

  useEffect(() => {
    asyncGetCar();
  }, []);

  const asyncGetCar = async () => {
    const filter = { carId };
    setIsLoadingCars(true);
    const cars = await getCars(filter);
    setCars(cars);

    const res = await getRentals({ filter: { carId: cars[0].CarId } });
    console.log("res rentals", res);

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
        style={{ width: 290 }}
        className={`btn p-2 mx-1 ${
          isRentingAvailable ? "btn-success" : "btn-outline-success disabled"
        }`}
        onClick={handleReservation}>
        {cost > 0 ? `Inchiriaza pentru ${cost}$` : "Inchiriaza"}
      </div>
    );
  };

  const handleReservation = async () => {
    const user = await getUser();
    const car = cars[0];
    const rental = {
      carId: car.CarId,
      userId: user.userId,
      locationId: car.LocationId,
      startDate: startDate,
      endDate: endDate,
      totalPrice: cost,
    };
    const res = await createRental(rental);
    toast.success("Inchiriere cu succes!");
    history.push(`/rentals`);
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 20,
        }}>
        <h1 className="mb-4">{`Alege perioada`}</h1>
        <DatePicker
          onChangeDates={(start, end) => {
            setStartDate(start);
            setEndDate(end);
            setIsRentingAvailable(start && end);
            if (start && end) {
              const days = (end - start) / 86400;
              setCost(days * cars[0].PricePerDay);
            } else {
              setCost(0);
            }
          }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 10,
          }}>
          {renderActionButton()}
        </div>
      </div>
      {renderCars()}
    </Layout>
  );
};
