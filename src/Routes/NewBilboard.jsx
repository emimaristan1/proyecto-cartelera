import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import axios from 'axios'
import ErrorMsg from '../Components/ErrorMsg';
import SuccessMsg from '../Components/SuccessMsg';

export class NewBilboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            userLogged: this.props.user,
            projectName:'',
            description:'',
            msg:'',
            err:'',
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
        .then(response => {
            this.setState({msg: response.data, err: ''});
        }, error => {
            this.setState({err: error.response.data, msg: ''})
        })
        .catch(function (error) {alert(error.message)})

        this.setState({projectName:'',description:''})
    };
    
    render(){
        return (
            <div className="container d-flex justify-content-center">
                <div className="form-group w-75 p-3">
                    <h2>Nueva cartelera</h2>
                    <br />
                    {this.state.err && <ErrorMsg error={this.state.err}/>}
                    {this.state.msg && <SuccessMsg msg={this.state.msg}/>}
                    <form onSubmit={this.onSubmit}>
                        <input type="text" 
                            placeholder="Nombre de la cartelera"
                            onChange={this.changeProjectName} 
                            value={this.state.projectName} 
                            className="form-control form-group"  
                        />
                        <br />
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Descripción"
                            value={this.state.description} 
                            onChange={this.changeDescription} 
                            className="form-control form-group"
                        />
                        <br />
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
