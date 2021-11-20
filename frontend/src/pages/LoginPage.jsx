import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
//import background from "../img/backgroundLogin.jpg";
import { toast } from "react-toastify";

export const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ email, password });
      const res = await axios.post("/api/users/login", { email, password });
      console.log(res);
      if (res.data) {
        localStorage.setItem("authToken", res.data.token);
        toast.success("Login Succesful!");
        setTimeout(() => {
          history.push("/");
        }, 2000);
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
          <h1 className="text-center">Login Page</h1>
          <div className="card shadow p-3" style={{ borderRadius: 10 }}>
            <div className="card-body">
              <form>
                <div className="form-group">
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
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Link to="/register" className="mt-4 text-center">
            Create account
          </Link>
        </div>
      </div>
    </Layout>
  );
};
