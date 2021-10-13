import axios from 'axios'
import React, { Component } from 'react'

class Perfil extends Component {
    render() {    

        let info;

        if(this.props.user){
            info = (
                <h3>hi {this.props.user.name}</h3>
            )
        }else{
            info = (
                <h3>Tu no deberias estar aqui</h3>
            )
        }
        

        return (
            <div>
                <h1>Pefil</h1>
                {info}
            </div>
        )
        
        
    }
}

export default Perfil

