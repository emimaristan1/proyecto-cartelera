import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NewUser from './Routes/NewUser';
import Login from './Routes/Login';
import NavbarN from './Components/Navbar';
import Perfil from './Routes/Perfil'
import Inicio from './Routes/Inicio'
import ListBilboard from './Routes/ListBilboard'
import NewBilboard from './Routes/NewBilboard'
import axios from 'axios';
import React, { Component } from "react";
import EditUser from "./Routes/EditUser";
import Bilboard from "./Routes/Bilboard";

//https://bakend-proyecto-cartelera.herokuapp.com/

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            user:'',
            loggedIn:false
        }
    }

    componentDidMount = () => {
        if(localStorage.getItem("token")){
        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }

        axios.get('/users/me', config)
        .then(
            res => {
                this.setUser(res.data);
                this.setState({
                    loggedIn: true
                })
            },
            err => {
                console.log(err);
            }
        )       
        }
    }
    
    setUser = user =>{
        this.setState({user: user})
    }
    
    render(){

        return (
            <Router>
                <div className="container mt-5">
                    <NavbarN user={this.state.user} setUser={this.setUser}/>
                    <hr />
                    <Switch>
                        <Route index exact path="/" component={() => <Inicio user={this.state.user}/>}/>

                        <Route exact path="/users/newUser" render={() => (!this.state.loggedIn ? (<NewUser />) : (<Inicio />))} />
                        <Route exact path="/users/login" render={() => (!this.state.loggedIn ? (<Login setUser={this.setUser}/>) : (<Inicio />))} />
                        <Route exact path="/users/perfil" render={() => (this.state.loggedIn ? (<Perfil user={this.state.user}/>) : (<Inicio />))}/>
                        <Route exact path="/users/edit" render={() => (this.state.loggedIn ? (<EditUser user={this.state.user}/>) : (<Inicio />))} />
                        {/* <Route exact path="/users/"><ListUsers /></Route> */}

                        <Route exact path="/bilboard/new" render={() => (this.state.loggedIn ? (<NewBilboard /* user={this.state.user} *//>): (<Inicio />))}/>
                        <Route exact path="/bilboard/list" ><ListBilboard/></Route>
                        <Route path="/bilboard/:bilboardId" render={() => (this.state.loggedIn ? (<Bilboard user={this.state.user}/>): (<Inicio />))}/>
                        
                    </Switch>
                </div>
            </Router>
        )
    }  
}

export default App;
