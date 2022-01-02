import { ImageCarousel } from "./ImageCarousel";
import { isAuth } from "../helpers/isAuth";
import { Link } from "react-router-dom";

export const CarCard = ({ carDetails }) => {
  const handleReservation = () => {
    console.log("rezerva");
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
        <h4>{`${carDetails.pricePerDay} RON / Zi`}</h4>
        <p>{`In limita a 300km / Zi`}</p>
      </>
    );
  };

  return (
    <div
      className="card shadow p-3 my-3 mx-1"
      style={{ borderRadius: 10, maxWidth: "50em" }}>
      <ImageCarousel images={carDetails.images} />
      <div style={{ flex: 1, marginTop: 20 }}>
        <h2>{`${carDetails.manufacturer} ${carDetails.type}`}</h2>
        <h5 style={{ marginTop: 15 }}>{`${carDetails.fabricationYear} - ${
          carDetails.automated ? "Automatic" : "Manual"
        } - ${carDetails.color}`}</h5>
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
