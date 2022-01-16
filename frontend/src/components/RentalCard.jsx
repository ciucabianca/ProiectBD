import moment from "moment";

export const RentalCard = ({ rental }) => {
  console.log(rental);

  return (
    <div className="card bg-secondary text-white mb-3">
      <div className="card-header"></div>
      <div className="card-body">
        <h4 className="card-title">{`${rental.Manufacturer} - ${rental.Model} - ${rental.FabricationYear}`}</h4>
        <p className="card-text">{`Starting With: ${moment
          .unix(rental.StartDate)
          .format("DD/MM/YYYY")}`}</p>
        <p className="card-text">{`Ending With: ${moment
          .unix(rental.EndDate)
          .format("DD/MM/YYYY")}`}</p>
        <p className="card-text">From: {rental.LocationName}</p>
        <p className="card-text">Fabrication Year: {rental.FabricationYear}</p>
      </div>
    </div>
  );
};
