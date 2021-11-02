import { Component } from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';


export class NavbarN extends Component {
    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);

    };

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