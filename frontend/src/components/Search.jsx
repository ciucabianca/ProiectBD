import { LocationPicker } from "./LocationPicker";

export const Search = ({ onLocationChange, onFind }) => {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      <LocationPicker onLocationChange={onLocationChange} />
      <div>
        <button
          className="btn btn-success ml-1"
          style={{ height: 48, width: 65 }}
          onClick={onFind}>
          Find
        </button>
      </div>
    </div>
  );
};
