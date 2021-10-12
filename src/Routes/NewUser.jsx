import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

class NewUser extends Component{
    constructor(){
        super()
        this.state = {
            username:'',
            email:'',
            password:''
        }
        this.changeUserName = this.changeUserName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    changeUserName(event){
        this.setState({
            username:event.target.value
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
            name:this.state.username,
            email:this.state.email,
            password:this.state.password
        }

        axios.post('https://bakend-proyecto-cartelera.herokuapp.com/users/new', registered)
        .then(response => console.log(response.data))

        this.setState({
            username:'',
            email:'',
            password:''
        })
    };
    
    render(){
        return (
            <div className="container">
                <h2>Nuevo usuario</h2>
                <div className="form-group">
                    <form onSubmit={this.onSubmit}>
                        <input type="text" 
                        placeholder="Nombre"
                        onChange={this.changeUserName} 
                        value={this.state.username} 
                        className="form-control form-group"  
                        />
                        <input type="text" 
                        placeholder="Email"
                        onChange={this.changeEmail} 
                        value={this.state.email} 
                        className="form-control form-group"  
                        />
                        <input type="password" 
                        placeholder="password"
                        onChange={this.changePassword} 
                        value={this.state.password} 
                        className="form-control form-group"  
                        />
                        <input type="submit"
                        className="btn btn-danger btn-block"
                        value='submit'
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default NewUser
