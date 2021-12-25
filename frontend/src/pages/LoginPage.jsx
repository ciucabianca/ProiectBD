import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAction } from "../api/users";

export const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = await loginAction({ email, password });
    if (token) {
      toast.success("Login Succesful!");
      setTimeout(() => {
        history.push("/");
      }, 2000);
    } else {
      toast.error("Wrong credentials!");
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
          <div
            className="card shadow p-3"
            style={{
              borderRadius: 10,
              opacity: 0.8,
            }}>
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
                    onClick={onSubmit}>
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Link to="/register" className="btn btn-primary mt-4 text-center">
            Create account
          </Link>
        </div>
      </div>
    </Layout>
  );
};
