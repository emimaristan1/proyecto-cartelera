import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewUser from './Routes/NewUser';
import ListUsers from './Routes/ListUsers';


// https://bakend-proyecto-cartelera.herokuapp.com/api/users
function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1>Navbar</h1>
        <div className="btn-group">
          <Link to="/" className="btn btn-primary">
            Inicio
          </Link>

          <Link to="/users" className="btn btn-primary">
            Usuarios
          </Link>

          <Link to="/users/newUser" className="btn btn-dark">
            Nuevo Usuario
          </Link>
        </div>
        
        <hr />

        <Switch>
          <Route path="/users" exact>
            <ListUsers />
          </Route>
          <Route path="/users/newUser">
           <NewUser />
          </Route>
          <Route path="/" exact>
            <h1>Index</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
