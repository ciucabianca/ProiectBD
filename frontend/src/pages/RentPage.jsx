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
import moment from "moment";

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

    const rentals = await getRentals({ filter: { carId: cars[0].CarId } });
    const rentalDates = rentals.map((rental) => {
      const start = moment
        .unix(rental.StartDate)
        .set({ hour: 12, minute: 0, second: 0 })
        .unix();
      const end = moment
        .unix(rental.EndDate)
        .set({ hour: 12, minute: 0, second: 0 })
        .unix();
      return [start, end];
    });
    console.log("rental dates", rentalDates);
    setRentals(rentalDates);

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
          isRentingAvailable ? "btn-success" : "btn-success disabled"
        }`}
        onClick={handleReservation}>
        {cost > 0 ? `Rent for ${cost}$` : "Rent"}
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
          rentals={rentals}
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
