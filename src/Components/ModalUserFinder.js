import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function ModalUserFinder(props) {
    const [usuarios, setUsers] = useState([])
    const [resUsuarios, setResUsers] = useState([])

    const handleChange = e => {
        filtrar(e.target.value)
    };

    const consumeApiUsers = async() => {
        await axios.get('/users/list')
        .then(res=>{
            setUsers(res.data)
        })
    }

    useEffect(() => {
        async function fetchData(){
            await consumeApiUsers()
        }
        fetchData()
    }, [])

    const filtrar=(termBusqueda) =>{
        //de todos los usuarios que devuelve el backend
        var resBusqueda=usuarios.filter((elemento) =>{
            //filtra en los que coincida el nombre y email con lo escrito en el termBusqueda
            if(elemento.name.toString().toLowerCase().includes(termBusqueda.toString().toLowerCase()) ||
                elemento.email.toString().toLowerCase().includes(termBusqueda.toString().toLowerCase())){
                return elemento;
            }else
                return ''
        });

        //excluye los usuarios que ya estan inculidos en el bilboard
        resBusqueda=resBusqueda.filter(elemento => !props.members.includes(elemento.email))

        //si el termino de busqueda esta vacio no muestra nada
        if(termBusqueda.toString().length<1)
            resBusqueda=[]
        setResUsers(resBusqueda)
    }

    function addMember(userId) {
        const created={
            bilboardId: props.bilboardid,
            bilboardName: props.bilboardname,
            userId: userId,
            authId: props.authId
        }
        /* console.log(created); */

        axios.post('/invitation/new', created).then(response => alert(response.data))
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Agregar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            placeholder="Buscar..." 
                            onChange = {handleChange}
                        />
                        
                    </Form.Group>
                </Form>
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        { resUsuarios && 
                            resUsuarios.map((usuario, key) =>(
                                <tr key={key}>
                                    <td>{usuario.name.toLowerCase()}</td>
                                    <td>{usuario.email.toLowerCase()}</td>
                                    <td>
                                        <Button onClick={(e) => addMember(usuario._id)}>Agregar</Button>
                                    </td>
                                </tr>
                            ))
                        }   
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUserFinder
