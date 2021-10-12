import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'

export class Login extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div className="container">
                <h2>Login</h2>
                <div className="form-group">
                    <form>
                        <input type="text" 
                        placeholder="Email"
                        name="email" 
                        className="form-control form-group"
                        />
                        <input type="password" 
                        name="password" 
                        placeholder="Password"
                        className="form-control form-group"
                        />
                        <input type="submit" 
                        value="Login" 
                        className="btn btn-success btn-block"
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
