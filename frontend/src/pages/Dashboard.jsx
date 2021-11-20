import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";

export const Dashboard = (props) => {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <div className="d-flex row">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link
          to="/"
          onClick={() => {
            console.log("logged out");
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          }}
        >
          Log Out
        </Link>
      </div>
    </Layout>
  );
};
