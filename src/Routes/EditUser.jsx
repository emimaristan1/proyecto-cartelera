import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorMsg from '../Components/ErrorMsg';
import SuccessMsg from '../Components/SuccessMsg';

class EditUser extends Component {
    constructor(props){ 
        super(props)
        this.state = {
            name:this.props.user.name,
            email:this.props.user.email,
            msg:'',
            err:'',
            modifyIn: 0
        }
        this.changeName = this.changeName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setMsg = this.setMsg.bind(this)
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
            this.setState({msg: 'Modificacion exitosa', modifyIn: 1, err:''});
            this.props.setUser(response.data.user)
        }, error => {
            this.setState({err: error.response.data, modifyIn: 2, msg: ''})
        })
    };

    render() {
        
        if(this.state.modifyIn===true){
            setTimeout(() => {  
                window.location.replace('/users/perfil');
            }, 1500);
        }

        return (
            <div> 
                <div className="form-group">
                    {this.state.err && <ErrorMsg error={this.state.err}/>}
                    {this.state.msg && <SuccessMsg msg={this.state.msg} setdata={this.setMsg}/>}
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" 
                        defaultValue={this.state.name}
                        onChange={this.changeName} 
                        className="form-control form-group"  
                        />
                        <input type="email" 
                        defaultValue={this.state.email} 
                        onChange={this.changeEmail} 
                        className="form-control form-group"  
                        />
                        <input type="submit"
                        className="btn btn-danger btn-block"
                        value='Modificar'
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default EditUser