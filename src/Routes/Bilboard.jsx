import axios from 'axios';
import React, { Component } from 'react'
import { Card, ListGroup, Button, Modal, Nav ,Alert } from 'react-bootstrap';
import { withRouter } from "react-router";
import ListTask from '../Components/ListTask';
import SuccessMsg from '../Components/SuccessMsg';
import ErrorMsg from '../Components/ErrorMsg';

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
            showmodal:false,
            msg:'',
            errorMsg:''
        }

        this.showModal = this.showModal.bind(this)
        this.setMsg = this.setMsg.bind(this)
    }

    handleClose = () => this.setModalShow(false)
    handleShow = () => this.setModalShow(true)

    showModal(value){this.setState({modalShow: value})}
    setModalShow(state){this.setState({showmodal: state})}
    addTask = () =>{ this.setState({ tasks: this.state.tasks.concat([this.state.task])})}//agrega al array this.state.tasks el this.state.task cargado
    setMsg = data =>{this.setState({msg: data})}
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

    removeTask = (e) => {
        this.setState({
            tasks: this.state.tasks.filter(function(task){
                return task._id !== e 
            })
        });
    }

    completeTask = (id) =>{
        const created = {
            idBilboard: this.state.bilboard._id,
            idTask: id
        };

        axios.post('/bilboards/deletetask', created)
        .then(res => {
            this.setMsg(res.data)
            this.removeTask(id)
        },err => {
            this.setState({errorMsg: err.response.data})
        });
        //     axios.post('/tasks/delete', created1).then(res => alert(res.data)).catch(error => {alert(error.message)})
        /* window.location.href = window.location.href; */
    }

    createTask = (e) =>{ 
        e.preventDefault();
        const titulo1 = document.getElementById("titulo");
        const descripcion1 = document.getElementById("descripcion");
        const created = {
            titulo: titulo1.value,
            descripcion: descripcion1.value
        }

        axios.post('/tasks/new', created).then(response => {
            const created1 = {
                idBilboard: this.state.bilboardId,
                idTask: response.data._id
            };
            axios.post('/bilboards/addtask', created1)
            .then(res => {
                this.setMsg(res.data)
                this.onChangeTask(response.data)
                this.addTask()
            }).catch(error => {
                this.setState({errorMsg: error.message})
            });
        }).catch(err => {
            this.setState({errorMsg: err.message})
        });
        
        /* this.handleClose(); */
    };

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
                },err => {
                    this.setState({errorMsg: err.response.data})
                });
            },err => {
                this.setState({errorMsg: err.response.data})
            });
            this.setState({bilboard: bilboard})
        });
        
    }
    
    shouldComponentUpdate(tasks){
        if(tasks !== this.state.tasks)
            return true
        
        return false
    }


    onChangeMember(mem){ //carga this.state.member con mem
        this.setState({member: mem})  //asigna a this.state.member la id de usuario en mem
    };

    handleclick(){
        const head={
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }

        axios.post('/bilboards/unsubscribeme', {idBilboard: this.state.bilboardId}, head)
        .then(response => {
            this.setMsg(response.data)

            //elimina la invitacion
            axios.delete('/invitation/delete', {idBilboard: this.state.bilboardId}, head)

            //redirige al inicio
            /*  setTimeout(() => {  
                window.location.replace('/');
            }, 3000); */
        }, error => {
            this.setState({errorMsg: error.response.data})
        });
    }

    render() {
        {this.state.tasks.length>0 && console.log(this.state.tasks)}
        return this.state.bilboard ? (
            <>
                {this.state.msg && <SuccessMsg msg={this.state.msg} setdata={this.setMsg}/>}
                {this.state.errorMsg && <ErrorMsg error={this.state.errorMsg} />}
                <Card>
                    <Card.Header as="h2">
                        {this.state.bilboard.projectName}
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>{this.state.bilboard.description}</p>
                        </blockquote>
                    </Card.Body>                    
                </Card>
                <Card>
                    <Card.Header>
                        <h5 style={{float: "left"}}>Tareas</h5>
                        <button onClick={this.handleShow} style={{float: "right"}} className="btn btn-success">
                            Agregar tarea
                        </button>
                    </Card.Header>

                    {/* <div className="d-flex flex-wrap justify-content-center">
                        { this.state.tasks.map((task, key) => (
                            <div key={key} className="alert alert-secondary" style={{margin: "10px", maxWidth: "300px", float: "left", minWidth: "250px"}}>
                                <h5>{task.titulo}</h5>
                                <p className="alert-heading fs-6">{task.descripcion}</p>
                                <Button onClick={ ()=> this.completeTask(task._id)} style={{float: "right", marginLeft: '5px'}} className="btn btn-success btn-sm">Completar</Button>
                            </div>
                        ))}
                    </div> */}
                        <ListTask tasks={this.state.tasks} completeTask={this.completeTask}/>
                </Card>
                {
                    this.state.members.length!==0 && 
                        <Card>
                            <Card.Header as="h5" style={{float: "left"}}>Miembros
                                {this.state.loggedUser._id===this.state.bilboard.authId &&
                                    <Nav variant="pills" style={{float: "right"}}>
                                        <Nav.Item>
                                            <Nav.Link href={"/bilboard/" + this.state.bilboardId + "/addmembers"}> 
                                                Agregar Miembros
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                }
                            </Card.Header>

                            <ListGroup as="ol">
                                {
                                    this.state.members.map((member, key) => (
                                        member===this.state.bilboard.authEmail ? 
                                        (<ListGroup.Item as="li" key={key} >{member} ????</ListGroup.Item>) :
                                        (<ListGroup.Item as="li" key={key} >{member}</ListGroup.Item>)
                                    ))
                                }
                            </ListGroup>
                        </Card>
                }
                <Modal show={this.state.showmodal} onHide={this.handleClose}>
                    <form onSubmit={this.createTask}>
                        <Modal.Header closeButton>
                            <Modal.Title>Crear nueva tarea</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <label for="titulo" className="form-label">Titulo</label>
                                <input type="text" 
                                id="titulo"
                                placeholder="Ingrese el titulo de la tarea"
                                className="form-control form-group"  
                                />
                            </div>
                            <div className="mb-3">
                                <label for="descripcion" className="form-label">Descripcion</label>
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

                
                {
                    //si el usuario no es el administrador
                    this.state.loggedUser._id !== this.state.bilboard.authId &&
                    <Button variant="danger" onClick={(e) => this.handleclick()}>Darse de baja</Button>
                }

            </>
        ) : (<div><h1>Loading...</h1></div>)
    }
}

export default withRouter(Bilboard)