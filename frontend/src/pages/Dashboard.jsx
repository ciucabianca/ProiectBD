import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";

export const Dashboard = (props) => {
  return (
    <Layout>
      <h1 className="text-center">
        {localStorage.authToken ? "Welcome!" : "Cars on Demand"}
      </h1>
      <div className="d-flex justify-content-center mt-3">
        <div className="d-flex flex-column">
          <Link
            className="btn btn-primary m-2"
            to="/login"
            style={{ opacity: 1.3 }}>
            Login
          </Link>
          <Link className="btn btn-primary m-2" to="/register">
            Register
          </Link>
          <Link
            className="btn btn-danger m-2 px-5"
            to="/"
            onClick={() => {
              console.log("logged out");
              localStorage.removeItem("authToken");
              window.location.href = "/login";
            }}>
            Log Out
          </Link>
        </div>
      </div>
    </Layout>
  );
};
