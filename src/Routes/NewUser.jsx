import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import ErrorMsg from '../Components/ErrorMsg';
import SuccessMsg from '../Components/SuccessMsg';

export class NewUser extends Component{
    constructor(){
        super()
        this.state = {
            name:'',
            email:'',
            password:'',
            errorMsg: '',
            msg:''
        }
        this.changeName = this.changeName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    setMsg = data =>{this.setState({msg: data})}

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
        .then(response => {
            this.setState({msg: response.data.msg, errorMsg:''})
        },error => {
            this.setState({errorMsg: error.response.data, msg:''})
        });

        this.setState({name:'',email:'',password:''})
    };
    
    render(){
        return (
            <div className="container d-flex justify-content-center">
                <div className="form-group w-50 p-3">
                    <h2>Nuevo usuario</h2>
                    <br />
                    {this.state.errorMsg && <ErrorMsg error={this.state.errorMsg} />}
                    {this.state.msg && <SuccessMsg msg={this.state.msg} setdata={this.setMsg}/>}
                    <form onSubmit={this.onSubmit}>
                        <input type="text" 
                        placeholder="Nombre"
                        onChange={this.changeName} 
                        value={this.state.name} 
                        className="form-control form-group"  
                        />
                        <br />
                        <input type="email" 
                        placeholder="Email"
                        onChange={this.changeEmail} 
                        value={this.state.email} 
                        className="form-control form-group"  
                        />
                        <br />
                        <input type="password" 
                        placeholder="Password"
                        onChange={this.changePassword} 
                        value={this.state.password} 
                        className="form-control form-group"  
                        />
                        <br />
                        <input type="submit"
                        className="btn btn-success btn-block"
                        value='Registrarme'
                        />
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}

export default NewUser
