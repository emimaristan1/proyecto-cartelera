import axios from 'axios';
import React, { Component } from 'react'
import { Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { withRouter } from "react-router";
import ModalUserFinder from '../Components/ModalUserFinder';

export class Bilboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            bilboardId:this.props.match.params.bilboardId, //obtiene la id del bilboard de la URL
            bilboard:'',
            members:[],
            tasks:[],
            task:'',
            member:'',
            loggedUser:this.props.user,
            modalShow:false,
            showmodal:false
        }

        this.showModal = this.showModal.bind(this)
    }

    showModal(value){
        this.setState({
            modalShow: value
        })
    }

    completeTask(id){
        //Agregar codigo para eliminar tarea
    }
    modifyTask(id){
        //Agregar codigo para modificar tarea
    }
    createTask = () =>{ 
        const titulo1 = document.getElementById("titulo");
        const descripcion1 = document.getElementById("descripcion");
        const created = {
            titulo: titulo1.value,
            descripcion: descripcion1.value
        }
        
        axios.post('/tasks/new', created).then(response => {
            const created1 = {
                idBilboard: this.state.bilboard._id,
                idTask: response.data._id
            };
            console.log(created1);
            axios.post('/bilboards/addtask', created1).then(res => alert(res.data)).catch(error => {alert(error.message)})
        }).catch(err => {alert(err.message)});
    };

    handleClose = () => this.setState({showmodal: false});
    
    handleShow = () => this.setState({showmodal: true});

    componentDidMount(){    //al cargar los elementos
        axios.get('/bilboards/' + this.state.bilboardId).then(res=>{ //trae del backend el bilboard segun su id
            const bilboard = res.data

            
            bilboard.members.forEach(memberId => {
                axios.get('/users/'+memberId)
                .then(user => {
                    this.onChangeMember(user.data)
                    this.addMember()
                })
            });
            bilboard.tasks.forEach(taskId => {
                axios.get('/tasks/'+taskId)
                .then(task => {
                    this.onChangeTask(task.data)
                    this.addTask()
                })
            });
            this.setState({bilboard: bilboard})
        });
        
    }
    addTask = () =>{  //agrega al array this.state.tasks el this.state.task cargado
        this.setState({ 
            tasks: this.state.tasks.concat([this.state.task])
        })
    };

    onChangeTask(tsk){ //carga this.state.task con tsk
        this.setState({task: tsk})  //asigna a this.state.task la id de la task en tsk
    };

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
                <Card>
                    <Card.Header><h5 style={{float: "left"}}>Tareas</h5><button onClick={this.handleShow} style={{float: "right"}} className="btn btn-success">Agregar tarea</button></Card.Header>
                    <div className="d-flex flex-wrap justify-content-center">
                    { this.state.tasks.map((task, key) => (
                        <div key={key} className="alert alert-secondary" style={{margin: "10px", maxWidth: "300px", float: "left", minWidth: "250px"}}>
                            <h5>{task.titulo}</h5>
                            <p className="alert-heading fs-6">{task.descripcion}</p>
                            <button onClick={this.completeTask(task._id)} style={{float: "right", marginLeft: '5px'}} className="btn btn-success btn-sm">Completar</button>
                            <button onClick={this.modifyTask(task._id)} style={{float: "right"}} className="btn btn-warning btn-sm">Modificar</button>
                        </div>
                    ))}
                    </div>
                </Card>


                {
                    this.state.members.length!==0 ? (
                        <Card>
                            <Card.Header as="h5">Miembros</Card.Header>
                            {
                                this.state.loggedUser._id===this.state.bilboard.authId ? (
                                    <Button onClick={() => this.showModal(true)}>Agregar</Button>
                                ) : ''
                            }

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
                    ) : ''
                }
                <Modal show={this.state.showmodal} onHide={this.handleClose}>
                    <form onSubmit={this.createTask}>
                        <Modal.Header closeButton>
                            <Modal.Title>Crear nueva tarea</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <label for="titulo" class="form-label">Titulo</label>
                                <input type="text" 
                                id="titulo"
                                placeholder="Ingrese el titulo de la tarea"
                                className="form-control form-group"  
                                />
                            </div>
                            <div className="mb-3">
                                <label for="descripcion" class="form-label">Descripcion</label>
                                <input type="text" 
                                id="descripcion"
                                placeholder="Ingrese la descripcion"
                                className="form-control form-group"  
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btn btn-danger" onClick={this.handleClose}>Cerrar</Button>
                            <Button type="submit" className="btn btn-success" onClick={this.handleClose}>Crear</Button>
                        </Modal.Footer>
                    </form>
                </Modal>

                <ModalUserFinder
                    show={this.state.modalShow}
                    onHide={() => this.showModal(false)}
                    members={this.state.members}
                    bilboardid={this.state.bilboard._id}
                    bilboardname={this.state.bilboard.projectName}
                    authId={this.props.user._id}
                />

            </>
        ) : (<div><h1>Loading...</h1></div>)
    }
}

export default withRouter(Bilboard)

