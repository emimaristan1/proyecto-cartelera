import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export class NewBilboard extends Component{
    constructor(props){
        super(props)
        this.state = {
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
            adminEmail:this.props.user.email,
            description:this.state.description
        }

        axios.post('/bilboard/new', created)
        .then(response => alert(response.data))

        this.setState({
            projectName:'',
            description:''
        })
    };
    
    render(){
        return (
            <div className="container">
                <h2>Nueva cartelera</h2>
                <div className="form-group">
                    <form onSubmit={this.onSubmit}>
                        <input type="text" 
                        placeholder="Nombre de la cartelera"
                        onChange={this.changeProjectName} 
                        value={this.state.projectName} 
                        className="form-control form-group"  
                        />
                        <input type="text" 
                        placeholder="Descripción"
                        onChange={this.changeDescription} 
                        value={this.state.description} 
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
