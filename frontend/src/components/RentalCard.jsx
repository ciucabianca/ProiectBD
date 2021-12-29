export const RentalCard = (props) => {
  const { rental } = props;
  return (
    <div class="card bg-secondary text-white mb-3">
      <div class="card-header"></div>
      <div class="card-body">
        <h4 class="card-title">{rental.Manufacturer}</h4>
        <p class="card-text">Fabrication Year: {rental.FabricationYear}</p>
        <p class="card-text">Color: {rental.Color}</p>
        <p class="card-text">Rented Starting With: {rental.StartDate}</p>
        <p class="card-text">Ending With: {rental.EndDate}</p>
      </div>
    </div>
  );
};
