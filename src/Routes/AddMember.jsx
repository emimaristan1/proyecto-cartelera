import React, { Component } from 'react'
import { withRouter } from "react-router";
import { Table, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

export class AddMember extends Component {
    constructor(props){
        super(props);
        this.state = {
            bilboardId:this.props.match.params.bilboardId, //obtiene la id del bilboard de la URL
            bilboard:'',
            users:[],
            resUsers:[],
            member:'',
            members:[],
            invitations:[],
            msg:''
        }
    }

    handleChange = e => {
        this.filtrar(e.target.value);
    }

    filtrar=(termBusqueda) =>{
        //de todos los usuarios que devuelve el backend
        var resBusqueda=this.state.users.filter((elemento) =>{
            //filtra en los que coincida el nombre y email con lo escrito en el termBusqueda
            if(elemento.name.toString().toLowerCase().includes(termBusqueda.toString().toLowerCase()) ||
                elemento.email.toString().toLowerCase().includes(termBusqueda.toString().toLowerCase())){
                return elemento;
            }else
                return ''
        });

        //excluye los usuarios que ya estan inculidos en el bilboard
        resBusqueda=resBusqueda.filter(elemento => !this.state.members.includes(elemento.email))

        //excluye los usuarios que ya estan invitados en el bilboard
        //resBusqueda=resBusqueda.filter(elemento => !this.state.invitations.includes(elemento._id))

        //si el termino de busqueda esta vacio no muestra nada
        if(termBusqueda.toString().length<1)
            resBusqueda=[]
            this.setState({resUsers: resBusqueda})
    }

    componentDidMount(){
        //lista todos los usuarios
        axios.get('/users/list', {bilboardId: this.props.match.params.bilboardId}).then(res=>{this.setState({users: res.data})})

        //trae del backend el bilboard segun su id
        axios.get('/bilboards/' + this.state.bilboardId).then(res=>{ 
            const bilboard = res.data
            //guarda los miembros de la cartelera
            bilboard.members.forEach(memberId => {
                axios.get('/users/'+memberId)
                .then(user => {
                    this.onChangeMember(user.data)
                    this.ListMember()
                })
            });
            
            this.setState({bilboard: bilboard})
        });
        
        axios.get('/invitation/' + this.state.bilboardId).then(res=>{this.setState({invitations: res.data})});
    }

    componentDidUpdate(prevState){
        if(prevState.resUsers !== this.state.resUsers){
            axios.get('/invitation/' + this.state.bilboardId).then(res=>{this.setState({invitations: res.data})});
        }
    }

    onChangeMember(mem){ //carga this.state.member con mem
        this.setState({member: mem})  //asigna a this.state.member la id de usuario en mem
    };

    ListMember = () =>{  //agrega al array this.state.members el this.state.member cargado
        this.setState(state => { 
            const members = state.members.concat(this.state.member.email);
            return {
                members,
                member:''
            }
        })
    };

    addMember(userId) {
        const created={
            bilboardId: this.state.bilboardId,
            bilboardName: this.state.bilboard.projectName,
            userId: userId,
            authId: this.props.user._id
        }
        axios.post('/invitation/new', created).then(response => this.setMsg(response.data))
    }

    setMsg = data =>{
        this.setState({msg: data})
    }

    render() {
        return (
            <div>
                <h1>Enviar invitación</h1>
                <Form id="create-course-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            placeholder="Buscar..." 
                            onChange = {this.handleChange}
                        />
                        
                    </Form.Group>
                </Form>
                {this.state.msg && <Message data={this.state.msg} setdata={this.setMsg}/>}
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.resUsers && 
                            this.state.resUsers.map((usuario, key) =>(
                                <tr key={key}>
                                    <td>{usuario.name.toLowerCase()}</td>
                                    <td>{usuario.email.toLowerCase()}</td>

                                    {!this.state.invitations.includes(usuario._id) ? 
                                    (<td><Button onClick={(e) => this.addMember(usuario._id)}>Invitar</Button></td>) :
                                    (<td><Button onClick={(e) => this.addMember(usuario._id)} disabled>Invitar</Button></td>)}
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

function Message(props){
    return(
        <Alert variant='success' onClose={() => props.setdata('')} dismissible>
            {props.data}
        </Alert>
    )
}

export default withRouter(AddMember)
