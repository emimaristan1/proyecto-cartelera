import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import axios from 'axios'

export class NewBilboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            userLogged: this.props.user,
            projectName:'',
            description:''
        }
        this.changeProjectName = this.changeProjectName.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
    }

    changeProjectName(event){
        this.setState({
            projectName:event.target.value
        })
    }
    changeDescription(event){
        this.setState({
            description:event.target.value
        })
    }

    onSubmit = (event) =>{
        event.preventDefault()

        const created = {
            projectName:this.state.projectName,
            adminId:this.state.userLogged._id,
            adminEmail: this.state.userLogged.email,
            description:this.state.description
        }

        axios.post('/bilboards/new', created)
        .then(response => alert(response.data))

        this.setState({
            projectName:'',
            description:''
        })
    };
    
    render(){
        return (
            <div className="container d-flex justify-content-center">
                <div className="form-group w-75 p-3">
                    <h2>Nueva cartelera</h2>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" 
                            placeholder="Nombre de la cartelera"
                            onChange={this.changeProjectName} 
                            value={this.state.projectName} 
                            className="form-control form-group"  
                        />
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Descripción"
                            value={this.state.description} 
                            onChange={this.changeDescription} 
                            className="form-control form-group"
                        />
                        <input type="submit"
                            className="btn btn-success btn-block"
                            value='Crear'
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default NewBilboard
