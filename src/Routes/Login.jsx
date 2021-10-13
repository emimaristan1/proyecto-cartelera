import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Component } from "react";
import { setTokenSourceMapRange } from 'typescript';

class Login extends Component{
    state = {}

    handleSubmit = e => {
        e.preventDefault();
        
        const data = {
            email: this.email,
            password: this.password
        }

        axios.post('/users/login', data)
        .then(res => {
            /* console.log(res); */
            localStorage.setItem('token', res.data.token)
            this.setState({
                loggedIn: setTokenSourceMapRange
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        if(this.data.loggedIn){
            return <Redirect to={'/'} />
        }
        return (
            <div className="container">
                <h2>Login</h2>
                <div className="form-group">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" 
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

