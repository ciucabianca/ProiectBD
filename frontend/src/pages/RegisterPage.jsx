import { useState } from "react";
import { Layout } from "../components/Layout";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const RegisterPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nume, setLastName] = useState("");
  const [prenume, setFirstName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/register", {
        email,
        password,
        nume,
        prenume,
      });
      if (res.data) {
        toast.success("Created new user succesfully!");
        // window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (localStorage.authToken) {
    console.log("already logged in");
    return <Redirect to="/" />;
  }
  return (
    <Layout>
      <div className="d-flex justify-content-center">
        <div className="d-flex row">
          <h1 className="text-center">Register Page</h1>
          <div className="card shadow p-3" style={{ borderRadius: 10 }}>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputFirstName"> First Name:</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    id="exampleInputFirstName"
                    aria-describedby="nameHelp"
                    placeholder="Enter First Name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="exampleInputLastName">Last Name:</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    id="exampleInputLastName"
                    aria-describedby="nameHelp"
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="exampleInputEmail">Email Address:</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="exampleInputPassword">Password:</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    id="exampleInputPassword"
                    aria-describedby="passwordHelp"
                    placeholder="Enter Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="row justify-content-between align-items-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    onClick={onSubmit}
                  >
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Link to="/login" className="mt-4 text-center">
            Log In
          </Link>
        </div>
      </div>
    </Layout>
  );
};
