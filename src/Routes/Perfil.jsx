import { Component } from 'react'

class Perfil extends Component {  


    render() {    
        let info;
        
        return (
            <div>
                <h1>{this.props.user.name}</h1>
                <p>{this.props.user.email}</p>
            </div>
        )
        
        
    }
}

export default Perfil

