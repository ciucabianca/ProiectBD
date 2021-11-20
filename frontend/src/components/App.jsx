import { Routing } from "../routing/Routing";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="webpage">
      <Routing />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
