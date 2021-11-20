import {BrowserRouter, Route, Routes} from 'react-router-dom';

export const Routing = () =>{
  return (<BrowserRouter>
  <Routes>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
  </Routes></BrowserRouter>)
}