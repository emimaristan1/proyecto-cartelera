import { Component } from 'react'
import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap';

export class NavbarN extends Component {
    constructor(props){
        super(props)
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);

    };

    showModal = () =>{
        this.props.showModal(true);
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">TextVoice</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto"
                            style={{ maxHeight: '200px'}}
                            navbarScroll
                        >
                            <Nav.Link href="/">Inicio</Nav.Link>
                            {/* <Nav.Link href="/users/">Listar Usuarios</Nav.Link> */}
                        </Nav>
                        {this.props.user ? <UserGreeting modal={this.showModal} onClick={this.handleLogout} user={this.props.user}/> : <GuestGreeting />}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

function UserGreeting(props){
    return (
        <Nav>
            <Nav.Item>
                <Nav.Link onClick={props.modal}>
                    Invitaciones {props.cantInv>0 ? (<Badge variant="primary" bg="danger" pill>{props.cantInv}</Badge>) : ''}
                </Nav.Link>
            </Nav.Item>
            <NavDropdown title='Carteleras' id="basic-nav-dropdown">
                <NavDropdown.Item href="/bilboard/new">Crear cartelera</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/bilboard/list">Mis carteleras</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={props.user.name} id="basic-nav-dropdown">
                <NavDropdown.Item href="/users/perfil">Mi perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={props.onClick}>Logout</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
}

function GuestGreeting(){
    return (
        <Nav>
            <Nav.Link href="/users/newUser" >Nuevo Usuario</Nav.Link>
            <Nav.Link href="/users/login">Login</Nav.Link>
        </Nav>
    )
}

export default NavbarN