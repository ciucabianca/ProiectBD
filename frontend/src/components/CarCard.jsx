import { ImageCarousel } from "./ImageCarousel";
import { isAuth } from "../helpers/isAuth";
import { Link, useHistory } from "react-router-dom";

export const CarCard = ({ carDetails }) => {
  const history = useHistory();

  const handleReservation = () => {
    history.push(`/rent/${carDetails.CarId}`);
  };

  const renderActionButton = () => {
    return isAuth() ? (
      <div className="btn btn-outline-success p-2" onClick={handleReservation}>
        Rezerva Acum!
      </div>
    ) : (
      <Link className="btn btn-outline-success p-2" to="/login">
        Reserva Acum!
      </Link>
    );
  };

  const renderOffer = () => {
    return (
      <>
        <h4>{`${carDetails.PricePerDay} RON / Zi`}</h4>
        <p>{`In limita a 300 km / Zi`}</p>
      </>
    );
  };

  return (
    <div
      className="card shadow p-3 my-3 mx-1"
      style={{ borderRadius: 10, maxWidth: "50em" }}>
      <ImageCarousel images={carDetails.Images} />
      <div style={{ flex: 1, marginTop: 20 }}>
        <h2>{`${carDetails.Manufacturer} ${carDetails.Type}`}</h2>
        <h5 style={{ marginTop: 15 }}>{`${carDetails.FabricationYear} - ${
          carDetails.Automated ? "Automatic" : "Manual"
        } - ${carDetails.Color}`}</h5>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
        }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          {renderActionButton()}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            flex: 2,
            marginRight: 10,
          }}>
          {renderOffer()}
        </div>
      </div>
    </div>
  );
};
