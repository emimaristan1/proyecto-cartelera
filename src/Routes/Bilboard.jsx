import axios from 'axios';
import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { withRouter } from "react-router";

export class Bilboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            bilboardId : this.props.match.params.bilboardId, //obtiene la id del bilboard de la URL
            bilboard:'',
            members:[],
            member:''
        }
    }

    componentDidMount(){    //al cargar los elementos
        axios.get('/bilboards/' + this.state.bilboardId).then(res=>{ //trae del backend el bilboard segun su id
            const bilboard = res.data

            /* console.log(bilboard); */
            bilboard.members.forEach(memberId => {

                axios.get('/users/'+memberId)
                .then(user => {
                    this.onChangeMember(user.data)
                    this.addMember()
                })
            });

            this.setState({bilboard: bilboard})
        });

    }

    addMember = () =>{  //agrega al array this.state.members el this.state.member cargado
        this.setState(state => { 
            const members = state.members.concat(this.state.member.email);
            return {
                members,
                member:''
            }
        })
    };

    onChangeMember(mem){ //carga this.state.member con mem
        this.setState({member: mem})  //asigna a this.state.member la id de usuario en mem
    };

    render() {
       /*  console.log(this.state.members); */
        return this.state.bilboard ? (
            <>
                <Card>
                    <Card.Header as="h2">{this.state.bilboard.projectName}</Card.Header>

                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p>
                            {this.state.bilboard.description}
                        </p>
                        </blockquote>
                    </Card.Body>                    
                </Card>
                {this.state.members.length!==0 ? (
                    <Card>
                    <Card.Header as="h5">Miembros</Card.Header>
                    <ListGroup as="ol">
                        {
                            this.state.members.map((member, key) => (
                                member===this.state.bilboard.authEmail ? 
                                (<ListGroup.Item as="li" key={key} >{member} 👑</ListGroup.Item>) :
                                (<ListGroup.Item as="li" key={key} >{member}</ListGroup.Item>)
                            ))
                        }
                    </ListGroup>
                </Card>
                ) : ''}
                
            </>
        ) : (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default withRouter(Bilboard)

