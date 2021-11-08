import { Component } from 'react'
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';

class Perfil extends Component {
    state = {}

    render() {    
        let info;
        if(this.props.user){
            info = (
                <>
                    <h3>hi {this.props.user.name}</h3>
                    <p>{this.props.user.email}</p>
                    <Button variant="primary" href="/users/edit">Editar perfil</Button>
                </>
            )
        }else{
            setTimeout(() => {}, 1000);
            return <Redirect to={'/'} />
        }

        
        return (
            <>
                {info}
            </>
        )
        
        
    }
}

export default Perfil

