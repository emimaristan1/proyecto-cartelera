import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NewUser from './Routes/NewUser';
import Login from './Routes/Login';
import NavbarN from './Components/Navbar';
import Perfil from './Routes/Perfil'
import axios from 'axios';
import { Component } from "react";

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
            <Route exact path="/">
              <h1>Inicio</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed iaculis ex. Cras consequat aliquam metus, id pellentesque arcu scelerisque quis. Vestibulum placerat, quam eget elementum convallis, nisi risus tempus urna, eu pharetra lorem risus id lectus. Nunc cursus porta risus, non rhoncus felis consequat sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In elementum ultricies viverra. Maecenas ultrices turpis vitae pellentesque dignissim. Maecenas finibus mollis tellus in consectetur. Maecenas sed scelerisque arcu. Vivamus at mauris nec massa iaculis finibus. Vestibulum ex sapien, aliquam id ligula a, suscipit vestibulum risus. 
                Donec est dui, varius id cursus luctus, aliquet et orci. Pellentesque sollicitudin eu odio id placerat. Proin pellentesque tincidunt leo nec tincidunt. Aliquam ullamcorper imperdiet elit eget dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam at viverra nisl, at ullamcorper justo. Nam hendrerit massa in maximus ultrices. Praesent non metus nec nisl convallis luctus at a magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent commodo eleifend neque, sit amet laoreet nisi tempor sed. Maecenas eget sem dictum lorem aliquet vehicula.
              </p>
            </Route>
            <Route exact path="/users/perfil" component={() => <Perfil user={this.state.user}/>}/>
          </Switch>
        </div>
      </Router>
    );
  }
  
}

export default App;
