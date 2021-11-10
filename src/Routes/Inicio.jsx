import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

class Inicio extends Component {
    render() {    
        let info;
        if(this.props.user){
            info = (
                <h3>{this.props.user.email}</h3>
            )
        }else{
            info = (
                <h1>Bienvenido a Cartelera! Inicie sesion para utilizar la aplicacion :)</h1>
            )
        }
        
        return (
            <div>{info}
            </div>
        )
        
        
    }
}
 
export default Inicio;