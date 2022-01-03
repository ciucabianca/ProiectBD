export const Search = ({ onLocationChange, onFind }) => {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
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
        <option value="value">Bucuresti</option>
        <option value="value2">Craiova</option>
      </select>

      <div>
        <button
          className="btn btn-outline-success ml-1"
          style={{ height: 48, width: 65 }}
          onClick={onFind}>
          Find
        </button>
      </div>
    </div>
  );
};
