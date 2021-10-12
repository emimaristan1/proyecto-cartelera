import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewUser from './Routes/NewUser';
import ListUsers from './Routes/ListUsers';
import Login from './Routes/Login';
import {ButtonToolbar, ButtonGroup} from 'react-bootstrap';

// https://bakend-proyecto-cartelera.herokuapp.com/users
function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1>Proyecto Cartelera</h1>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="First group">
            <Link to="/" className="btn btn-primary btn-block">Inicio</Link>
          </ButtonGroup>
          <ButtonGroup className="me-2" aria-label="Second group">
            <Link to="/users" className="btn btn-danger btn-block">Listar usuarios</Link>
          </ButtonGroup>
          <ButtonGroup className="me-2" aria-label="Third  group">
            <Link to="/users/newUser" className="btn btn-dark btn-block">Nuevo usuario</Link>
            <Link to="/users/login" className="btn btn-primary btn-block">Login</Link>
          </ButtonGroup>
        </ButtonToolbar>
        
        <hr />

        <Switch>
          <Route path="/users" exact>
            <ListUsers />
          </Route>
          <Route path="/users/newUser">
           <NewUser />
          </Route>
          <Route path="/users/login">
           <Login />
          </Route>
          <Route path="/" exact>
            <h1>Inicio</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed iaculis ex. Cras consequat aliquam metus, id pellentesque arcu scelerisque quis. Vestibulum placerat, quam eget elementum convallis, nisi risus tempus urna, eu pharetra lorem risus id lectus. Nunc cursus porta risus, non rhoncus felis consequat sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In elementum ultricies viverra. Maecenas ultrices turpis vitae pellentesque dignissim. Maecenas finibus mollis tellus in consectetur. Maecenas sed scelerisque arcu. Vivamus at mauris nec massa iaculis finibus. Vestibulum ex sapien, aliquam id ligula a, suscipit vestibulum risus. 
              Donec est dui, varius id cursus luctus, aliquet et orci. Pellentesque sollicitudin eu odio id placerat. Proin pellentesque tincidunt leo nec tincidunt. Aliquam ullamcorper imperdiet elit eget dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam at viverra nisl, at ullamcorper justo. Nam hendrerit massa in maximus ultrices. Praesent non metus nec nisl convallis luctus at a magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent commodo eleifend neque, sit amet laoreet nisi tempor sed. Maecenas eget sem dictum lorem aliquet vehicula.
            </p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
