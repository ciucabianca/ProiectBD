import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import { isAuth } from "../helpers/isAuth";

export const Dashboard = (props) => {
  const renderLogout = () => {
    return (
      <Link
        className="btn btn-danger m-2 px-5"
        to="/"
        onClick={() => {
          console.log("logged out");
          localStorage.removeItem("authToken");
        }}>
        Log Out
      </Link>
    );
  };

  const renderLinkButton = (label, path) => {
    return (
      <Link className="btn btn-primary m-2 px-5" to={`/${path}`}>
        {label}
      </Link>
    );
  };

  return (
    <Layout>
      <h1 className="text-center">
        {isAuth() ? "Welcome!" : "Cars on Demand"}
      </h1>
      <div className="d-flex justify-content-center mt-3">
        <div className="d-flex flex-column">
          {isAuth()
            ? renderLinkButton("See Available Cars", "catalog")
            : renderLinkButton("Login", "login")}
          {isAuth()
            ? renderLinkButton("My Rentals", "rentals")
            : renderLinkButton("Register", "register")}
          {isAuth() && renderLogout()}
        </div>
      </div>
    </Layout>
  );
};
