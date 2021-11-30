import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios';
import React, { Component } from "react";

import ModalInvitation from './Components/ModalInvitation';
import Navbar from './Components/Navbar';
import { FooterContainer } from "./Components/footerContainer";

import NewUser from './Routes/NewUser';
import Login from './Routes/Login';
import Perfil from './Routes/Perfil'
import Inicio from './Routes/Inicio'
import ListBilboard from './Routes/ListBilboard'
import NewBilboard from './Routes/NewBilboard'
import EditUser from "./Routes/EditUser";
import Bilboard from "./Routes/Bilboard";
import ListUsers from "./Routes/ListUsers"
import AddMember from './Routes/AddMember';


//https://bakend-proyecto-cartelera.herokuapp.com/

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            user:'',
            loggedIn:false,
            invitations: [],
            modalShow:false
        }
    }

    componentDidMount() {
        if(localStorage.getItem("token")){ //si no esta logueado
            const config = {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            }

            //busca al usuario segun su token
            axios.get('/users/me', config) 
            .then(res => {
                this.setUser(res.data); //setea el estado de usuario
                this.setState({loggedIn: true}) //setea el estado de loggedIn
            },err => {
                console.log(err);
            })
            
            axios.get('/invitation/my', config)
            .then(res => this.setInvitation(res.data)
            ,err => {
                console.log(err);
            });
        }
    }

    setUser = user =>{
        this.setState({user: user})
    }

    setInvitation = inv =>{
        this.setState({invitations: inv});
    }

    showModal = value =>{
        this.setState({modalShow: value})
    }
    
    render(){

        return (
            <>
                <Router>
                    {/* <div className="container mt-5"> */}
                    <Navbar 
                        user={this.state.user} 
                        setUser={this.setUser} 
                        showModal={this.showModal}
                        cantInv={this.state.invitations.filter(element => element.aprobe===0).length}
                    />
                    <div className="container-lg">
                        <br />
                        <Switch>
                            <Route index exact path="/" component={() => <Inicio user={this.state.user} isLoggedIn={this.state.loggedIn}/>}/>

                            <Route exact path="/users/newUser" render={() => (!this.state.loggedIn ? (<NewUser />) : (<Inicio />))} />
                            <Route exact path="/users/login" render={() => (!this.state.loggedIn ? (<Login setUser={this.setUser} setInvitation={this.setInvitation}/>) : (<Inicio />))} />
                            <Route exact path="/users/perfil" render={() => (this.state.loggedIn ? (<Perfil user={this.state.user} />) : (<Inicio />))}/>
                            <Route exact path="/users/edit" render={() => (this.state.loggedIn ? (<EditUser user={this.state.user} setUser={this.setUser}/>) : (<Inicio />))} />
                            <Route exact path="/users/list"><ListUsers /></Route>

                            <Route exact path="/bilboard/new" render={() => (this.state.loggedIn ? (<NewBilboard user={this.state.user}/>): (<Inicio />))}/>
                            <Route exact path="/bilboard/list" user={this.state.user}><ListBilboard/></Route>
                            <Route path="/bilboard/:bilboardId/addmembers" render={() => (this.state.loggedIn ? (<AddMember user={this.state.user}/>): (<Inicio />))}/>
                            <Route path="/bilboard/:bilboardId" render={() => (this.state.loggedIn ? (<Bilboard user={this.state.user}/>): (<Inicio />))}/>
                            
                        </Switch>
                        
                    </div>
                    <br/>
                    <FooterContainer />
                </Router>
                <ModalInvitation 
                    show={this.state.modalShow}
                    onHide={() => this.showModal(false)}
                    invitations={this.state.invitations}
                    user={this.state.user}
                /> 
            </>
        )
    }  
}

export default App;
