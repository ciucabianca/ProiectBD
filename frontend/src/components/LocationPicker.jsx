import { useEffect, useState } from "react";
import { getLocations } from "../api/locations";

export const LocationPicker = ({ onLocationChange }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getAsyncLocations();
  }, []);

  const getAsyncLocations = async () => {
    setLocations(await getLocations());
  };

  const renderLocationOptions = () => {
    return locations.map((location) => {
      return (
        <option value={location.LocationId}>{location.LocationName}</option>
      );
    });
  };

  return (
    <select
      className="form-control m-2"
      onChange={(e) => {
        onLocationChange(e.target.value);
      }}
      style={{ height: 48, minWidth: 120 }}>
      <option value="" disabled selected>
        Alege locatia
      </option>
      <option value="">Toate locatiile</option>
      {renderLocationOptions()}
    </select>
  );
};
