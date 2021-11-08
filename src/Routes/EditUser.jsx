import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router';

class EditUser extends Component {
    state = {}

    constructor(props){
        super(props)
        this.state = {
            name:'',
            email:''
        }
        this.changeName = this.changeName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

    handleSubmit = e =>{
        e.preventDefault()

        const modify = {
            name:this.state.name,
            email:this.state.email,
        }
        const head={
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }

        axios.post('/users/modify', modify, head)
        .then(response => {
            alert('Modificacion exitosa')

            this.setState({
                modifyIn: true
            })
            this.setUser(response.data.user)
        })
        .catch(err => {
            console.log(err);
        })

    };

    render() {
        if(this.state.modifyIn===true){
            setTimeout(() => {  
                window.location.reload(false);
            }, 1000);
                return <Redirect to={'/users/perfil'} />
        }

        let info;
        if(this.props.user){
            info = (
                <div className="form-group">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" 
                        defaultValue={this.props.user.name}
                        onChange={this.changeName} 
                        className="form-control form-group"  
                        />
                        <input type="email" 
                        defaultValue={this.props.user.email} 
                        onChange={this.changeEmail} 
                        className="form-control form-group"  
                        />
                        <input type="submit"
                        className="btn btn-danger btn-block"
                        value='Modificar'
                        />
                    </form>
                </div>
            )
        }
        return (
            <div>
                {info}
            </div>
        );
    }
}

export default EditUser