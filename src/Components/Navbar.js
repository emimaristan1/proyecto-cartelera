import { Component } from 'react'
import {Navbar, Nav, Container, NavDropdown, InputGroup, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';

export class NavbarN extends Component {
    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);

    };

    /*changeSearch(event){
        this.setState({
            filter: event.target.value
        })
    }

     showResults(arg){
        var value = arg.target.value

        axios.get('/search/users?q=' + value, function(data){
            console.log("hola");
        }).then(function(data){
            console.log(value);
            console.log(data)
        }, 200);

        axios.get('/search/bilboards?q=' + value, function(data){
            console.log("hola");
        }).then(function(data){
            console.log(value);
            console.log(data)
        }, 200);
    } */

    render() {
        let buttons;

        if(this.props.user){
            buttons = (
                <Nav>
                    <NavDropdown title='Carteleras' id="basic-nav-dropdown">
                        <NavDropdown.Item href="/bilboard/new">Crear cartelera</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/bilboard/list">Mis carteleras</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={this.props.user.name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/users/perfil">Mi perfil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/" onClick={this.handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            )
        }else{
            buttons=(
                <Nav>
                    <Nav.Link href="/users/newUser" >Nuevo Usuario</Nav.Link>
                    <Nav.Link href="/users/login">Login</Nav.Link>
                </Nav>
            )
        }

        return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Proyecto Cartelera</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto"
                                style={{ maxHeight: '200px'}}
                                navbarScroll
                            >
                                <Nav.Link href="/">Inicio</Nav.Link>
                                {/* <Nav.Link href="/users/">Listar Usuarios</Nav.Link> */}
                            </Nav>
                            {buttons}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }
}

export default NavbarN