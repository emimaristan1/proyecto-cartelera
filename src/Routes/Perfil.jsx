import { Component } from 'react'
import { Nav } from 'react-bootstrap';

class Perfil extends Component {
    constructor(props){
        super(props)
        this.state={
            user: this.props.user
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.user ? 'Cargando...' : 
                    <>
                        <h3>hi {this.state.user.name}</h3>
                        <p>{this.state.user.email}</p>
                        <Nav variant="pills" defaultActiveKey="/users/edit">
                            <Nav.Item>
                                <Nav.Link href="/users/edit">Editar Perfil</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </>
                }
                
            </div>
        )
        
        
    }
}

export default Perfil

