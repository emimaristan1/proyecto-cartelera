import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

class Perfil extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email:''
        }
        this.changeName = this.changeName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
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

    onSubmit = (event) =>{
        event.preventDefault()

        const modify = {
            name:this.state.name,
            email:this.props.user.email,
            newemail:this.state.email,
        }

        axios.post('/users/modify', modify)
        .then(response => alert(response.data))
    };


    render() {    
        let info;
        if(this.props.user){
            info = (
                <div>
                    <div className="form-group">
                        <form onSubmit={this.onSubmit}>
                            <input type="text" 
                            placeholder={this.props.user.name} 
                            onChange={this.changeName} 
                            className="form-control form-group"  
                            />
                            <input type="email" 
                            placeholder={this.props.user.email} 
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
            )
        }else{
            info = (
                <h3>Tu no deberias estar aqui</h3>
            )
        }
        
        return (
            <div>{info}
            </div>
        )
        
        
    }
}

export default Perfil

