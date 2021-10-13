import React, { Component } from 'react'
import {ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import {Link} from "react-router-dom";


export default class Navbar extends Component {
    render() {
        let buttons;

        if(this.props.user){
            buttons=(
                <ButtonGroup className="me-2" aria-label="Third  group">
                    <Link to={"/"} className="btn btn-primary btn-block" onClick={() => localStorage.clear()}>Logout</Link>
                </ButtonGroup>
            )
            
        }else{
            buttons = (
                <ButtonGroup className="me-2" aria-label="Third  group">
                    <Link to="/users/newUser" className="btn btn-dark btn-block">Nuevo usuario</Link>
                    <Link to="/users/login" className="btn btn-primary btn-block">Login</Link>
                </ButtonGroup>
            )
        }

        return(
            <nav>
                <h1>Proyecto Cartelera</h1>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Link to="/" className="btn btn-primary btn-block">Inicio</Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <Link to="/users" className="btn btn-danger btn-block">Listar usuarios</Link>
                    </ButtonGroup>
                    {buttons}
                </ButtonToolbar>
            </nav>
        )
    }
}