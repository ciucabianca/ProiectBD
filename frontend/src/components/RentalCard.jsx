export const RentalCard = ({ rental }) => {
  console.log("rental in card", rental);
  return (
    <div className="card mt-2">
      <div className="card-body">
        <pre>{JSON.stringify(rental, null, 4)}</pre>
      </div>
    </div>
  );
};
