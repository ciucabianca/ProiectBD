export const RentalCard = (props) => {
  const { rental } = props;
  return (
    <div className="card bg-secondary text-white mb-3">
      <div className="card-header"></div>
      <div className="card-body">
        <h4 className="card-title">{rental.Manufacturer}</h4>
        <p className="card-text">Fabrication Year: {rental.FabricationYear}</p>
        <p className="card-text">Color: {rental.Color}</p>
        <p className="card-text">Rented Starting With: {rental.StartDate}</p>
        <p className="card-text">Ending With: {rental.EndDate}</p>
      </div>
    </div>
  );
};
