import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Dashboard} />
        <Route exact={true} path="/login" component={LoginPage} />
        <Route exact={true} path="/register" component={RegisterPage} />
      </Switch>
    </BrowserRouter>
  );
};
