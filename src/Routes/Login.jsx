import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Component } from "react";
import { Redirect } from 'react-router';
import ErrorMsg from '../Components/ErrorMsg';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            errorMsg: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            email: this.email,
            password: this.password
        }

        axios.post('/users/login', data)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            this.setState({loggedIn: true})
            this.props.setUser(res.data.user)

            const config = {headers: {"x-access-token": res.data.token}}

            axios.get('/invitation/my', config)
            .then(res => {
                this.props.setInvitation(res.data);
                console.log(res.data);
            },err => {
                console.log(err.response.data);
            })
        }, error => {
            this.setState({errorMsg: error.response.data})
        });

    }

    render(){
        if(this.state.loggedIn){
            return <Redirect to={'/'} />
        }
        return (
            <div className="container d-flex justify-content-center" >
                <div className="form-group w-50 p-3">
                    <h2>Login</h2>
                    <br />
                    {this.state.errorMsg && <ErrorMsg error={this.state.errorMsg} />}
                    <form onSubmit={this.handleSubmit} >
                        <input type="email" 
                            placeholder="Email"
                            onChange={e => this.email = e.target.value}  
                            name="email" 
                            className="form-control form-group"
                        />
                        <br />
                        <input type="password" 
                            name="password" 
                            placeholder="Password"
                            onChange={e => this.password = e.target.value} 
                            className="form-control form-group"
                        />
                        <br />
                        <button className="btn btn-primary btn-block">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}


export default Login

