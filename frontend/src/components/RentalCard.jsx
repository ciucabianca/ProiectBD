import moment from "moment";
import { useState } from "react";

export const RentalCard = ({ rental, isEditable }) => {
  console.log(rental);

  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    setIsEditing(true);
    console.log("edit");
  };

  const onDelete = () => {
    console.log("delete");
  };

  const onSave = () => {
    setIsEditing(false);
    console.log("save");
  };

  const onCancel = () => {
    setIsEditing(false);
    console.log("cancel");
  };

  const renderDates = () => {
    if (isEditing && isEditable) {
      return <></>;
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
          <button className="btn btn-success" onClick={onSave}>
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
        <p className="card-text">Fabrication Year: {rental.FabricationYear}</p>
        {renderButtons()}
      </div>
    </div>
  );
};
