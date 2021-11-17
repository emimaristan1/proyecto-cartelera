import { Component } from 'react'
import { Button } from 'react-bootstrap';

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
                        <Button variant="primary" href="/users/edit">Editar perfil</Button>
                    </>

                }
                
            </div>
        )
        
        
    }
}

export default Perfil

