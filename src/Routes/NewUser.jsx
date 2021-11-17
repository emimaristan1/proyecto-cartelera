import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export class NewUser extends Component{
    constructor(){
        super()
        this.state = {
            name:'',
            email:'',
            password:''
        }
        this.changeName = this.changeName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    changeName(event){
        this.setState({
            name:event.target.value
        })
    }
    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }

    onSubmit = (event) =>{
        event.preventDefault()

        const registered = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }

        axios.post('/users/new', registered)
        .then(response => console.log(response.data))

        this.setState({
            name:'',
            email:'',
            password:''
        })
    };
    
    render(){
        return (
            <div className="container d-flex justify-content-center">
                <div className="form-group w-50 p-3">
                <h2>Nuevo usuario</h2>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" 
                        placeholder="Nombre"
                        onChange={this.changeName} 
                        value={this.state.name} 
                        className="form-control form-group"  
                        />
                        <input type="email" 
                        placeholder="Email"
                        onChange={this.changeEmail} 
                        value={this.state.email} 
                        className="form-control form-group"  
                        />
                        <input type="password" 
                        placeholder="Password"
                        onChange={this.changePassword} 
                        value={this.state.password} 
                        className="form-control form-group"  
                        />
                        <input type="submit"
                        className="btn btn-success btn-block"
                        value='Registrarme'
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default NewUser
