import { Routing } from "../routing/Routing";
import { ToastContainer } from "react-toastify";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

function App() {
  return (
    <div className="webpage">
      <Routing />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
