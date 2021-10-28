import React, { Component } from 'react'
import {ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import {Link} from "react-router-dom";


export default class Navbar extends Component {

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);

    };

    render() {
        let buttons;

        if(this.props.user){
            buttons=(
                <ButtonGroup className="d-flex" aria-label="Third  group">
                    <Link to={"/users/perfil"} className="btn btn-primary btn-block" >{this.props.user.name}</Link>
                    <Link to="/users" className="btn btn-primary btn-block">Listar usuarios</Link>
                    <Link to={"/"} className="btn btn-danger btn-block" onClick={this.handleLogout}>Logout</Link>
                </ButtonGroup>
            )
            
        }else{
            buttons = (
                <ButtonGroup className="d-flex" aria-label="Third  group">
                    <Link to="/users/newUser" className="btn btn-success ml-auto">Nuevo usuario</Link>
                    <Link to="/users/login" className="btn btn-primary ml-auto">Login</Link>
                </ButtonGroup>
            )
        }

        return(
            <nav>
                <h1>Proyecto Cartelera</h1>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="d-flex" aria-label="First group">
                        <Link to="/" className="btn btn-primary btn-block">Inicio</Link>
                    </ButtonGroup>
                    {buttons}
                </ButtonToolbar>
            </nav>
        )
    }
}