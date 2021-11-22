import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Component } from "react";
import { Redirect } from 'react-router';

class Login extends Component{
    state = {}

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            email: this.email,
            password: this.password
        }

        const user = await axios.post('/users/login', data);
        localStorage.setItem('token', user.data.token)
        this.setState({loggedIn: true})
        this.props.setUser(user.data.user)

        const config = {headers: {"x-access-token": user.data.token}}

        axios.get('/invitation/my', config).then(res => {
            this.props.setInvitation(res.data);
        },err => {
            console.log(err);
        })
    }

    render(){
        if(this.state.loggedIn){
            return <Redirect to={'/'} />
        }
        return (
            <div className="container d-flex justify-content-center" >
                <div className="form-group w-50 p-3">
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit} >
                        <input type="email" 
                            placeholder="Email"
                            onChange={e => this.email = e.target.value}  
                            name="email" 
                            className="form-control form-group"
                        />
                        <input type="password" 
                            name="password" 
                            placeholder="Password"
                            onChange={e => this.password = e.target.value} 
                            className="form-control form-group"
                        />
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

