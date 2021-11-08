import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NewUser from './Routes/NewUser';
import Login from './Routes/Login';
import NavbarN from './Components/Navbar';
import Perfil from './Routes/Perfil'
import Inicio from './Routes/Inicio'
import ListBilboard from './Routes/ListBilboard'
import NewBilboard from './Routes/NewBilboard'
import axios from 'axios';
import { Component } from "react";
import EditUser from "./Routes/EditUser";

//https://bakend-proyecto-cartelera.herokuapp.com/

class App extends Component {
  state = {}

  componentDidMount = () => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }

    axios.get('/users/me', config)
    .then(
        res => {
            this.setUser(res.data);
        },
        err => {
            console.log(err);
        }
    )       
  }

  setUser = user =>{
    this.setState({
      user: user
    })
  }

  render(){

    return (
      <Router>
        <div className="container mt-5">
          
        <NavbarN user={this.state.user} setUser={this.setUser}/>
          
          <hr />

          <Switch>
            {/* <Route exact path="/users/"><ListUsers /></Route> */}
            <Route exact path="/users/newUser"><NewUser /></Route>
            <Route exact path="/users/login" component={() => <Login setUser={this.setUser}/>} />
            <Route exact path="/users/perfil" component={() => <Perfil user={this.state.user}/>}/>
            <Route exact path="/users/edit" component={() => <EditUser user={this.state.user}/>}/>
            <Route exact path="/" component={() => <Inicio user={this.state.user}/>}/>
            <Route exact path="/bilboard/new"  component={() => <NewBilboard user={this.state.user}/>}/>
            <Route exact path="/bilboard/list"><ListBilboard /></Route>
            
          </Switch>
        </div>
      </Router>
    );
  }
  
}

export default App;
