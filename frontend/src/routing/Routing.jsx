import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CatalogPage } from "../pages/CatalogPage";
import { Dashboard } from "../pages/Dashboard";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { RentalsPage } from "../pages/RentalsPage";
import { RentPage } from "../pages/RentPage";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Dashboard} />
        <Route exact={true} path="/login" component={LoginPage} />
        <Route exact={true} path="/register" component={RegisterPage} />
        <Route exact={true} path="/rentals" component={RentalsPage} />
        <Route exact={true} path="/catalog" component={CatalogPage} />
        <Route exact={true} path="/rent/:carId" component={RentPage} />
      </Switch>
    </BrowserRouter>
  );
};
