import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { DatePicker } from "../components/DatePicker";
import { deleteRental, getRentals, updateRental } from "../api/rentals";

export const RentalCard = ({ rental, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rentals, setRentals] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    asyncGetRentals();
  }, []);

  const asyncGetRentals = async () => {
    const rentals = await getRentals({ filter: { carId: rental.CarId } });
    const rentalDates = rentals
      .filter((currentRent) => {
        return currentRent.RentalId !== rental.RentalId;
      })
      .map((rental) => {
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

    setRentals(rentalDates);
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const onDelete = async () => {
    await deleteRental(rental.RentalId);
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  const onSave = async () => {
    setIsEditing(false);
    await updateRental(rental.RentalId, startDate, endDate);
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  const renderDates = () => {
    if (isEditing && isEditable) {
      return (
        <div className="my-3">
          <DatePicker
            onChangeDates={(start, end) => {
              setStartDate(start);
              setEndDate(end);
              setIsUpdateAvailable(start && end);
            }}
            rentals={rentals}
          />
        </div>
      );
    } else {
      return (
        <>
          <p className="card-text">{`Starting With: ${moment
            .unix(rental.StartDate)
            .format("DD/MM/YYYY")}`}</p>
          <p className="card-text">{`Ending With: ${moment
            .unix(rental.EndDate)
            .format("DD/MM/YYYY")}`}</p>
        </>
      );
    }
  };

  const renderButtons = () => {
    if (isEditable === false) {
      return <></>;
    }

    if (isEditing) {
      return (
        <div>
          <button
            className={`btn btn-success ${
              isUpdateAvailable === false ? "disabled" : ""
            }`}
            onClick={onSave}>
            Salveaza
          </button>
          <button className="btn btn-danger mx-2" onClick={onCancel}>
            Anuleaza
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="btn btn-primary" onClick={onEdit}>
            Editeaza
          </button>
          <button className="btn btn-danger mx-2" onClick={onDelete}>
            Sterge
          </button>
        </div>
      );
    }
  };

  return (
    <div className="card bg-secondary text-white mb-3">
      <div className="card-header"></div>
      <div className="card-body">
        <h4 className="card-title">{`${rental.Manufacturer} - ${rental.Model} - ${rental.FabricationYear}`}</h4>
        {renderDates()}
        <p className="card-text">From: {rental.LocationName}</p>
        <p className="card-text">Total cost: {rental.TotalPrice}</p>
        {renderButtons()}
      </div>
    </div>
  );
};
