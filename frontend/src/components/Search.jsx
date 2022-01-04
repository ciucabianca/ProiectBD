import { DatePicker } from "./DatePicker";
import { LocationPicker } from "./LocationPicker";

export const Search = ({ onChangeDates, onLocationChange, onFind }) => {
  return (
    <div>
      <div
        className="d-flex flex-row justify-content-center align-items-center input-group flex-wrap"
        style={{ zIndex: 10 }}>
        <DatePicker onChangeDates={onChangeDates} />
        <LocationPicker onLocationChange={onLocationChange} />
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
