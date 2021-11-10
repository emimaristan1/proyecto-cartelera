import axios from 'axios';
import React, { Component } from 'react'
import { withRouter } from "react-router";

export class Bilboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            bilboardId : this.props.match.params.bilboardId //obtiene la id del bilboard de la URL
        }
    }

    componentDidMount(){    //al cargar los elementos
        axios.get('/bilboards/' + this.state.bilboardId) //trae del backend el bilboard segun su id
        .then(res=>{
            this.setState({
                bilboard: res.data
            })
            this.members()
        });
    }

    async members(){
        this.state.bilboard.members.map((member, key) => {
            axios.get('/users/'+member.id)
            .then(res=>{
                console.log(res.data);
            })
        });
    }

    render() {
        console.log(this.state.bilboard);

        return this.state.bilboard ? (
            <div>
                <h1>Cartelera: {this.state.bilboard.projectName}</h1>
                <h3>{this.state.bilboard.adminEmail}</h3>
                <p>{this.state.bilboard.description}</p>
                {
                    this.state.bilboard.members.map((member, key) => (
                        <ListItem key={key} value={member} />
                    ))
                }
            </div>
        ) : (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}

function ListItem(props) {
    return (<li>{props.value}</li>);
}

export default withRouter(Bilboard)

