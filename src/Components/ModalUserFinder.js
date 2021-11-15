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
        var resBusqueda=usuarios.filter((elemento) =>{
            if(elemento.name.toString().toLowerCase().includes(termBusqueda.toString().toLowerCase()) ||
                elemento.email.toString().toLowerCase().includes(termBusqueda.toString().toLowerCase()))
                return elemento;
        });
        if(termBusqueda.toString().length<1)
            resBusqueda=[]
        setResUsers(resBusqueda)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
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
                    </tr>
                </thead>
                <tbody>
                    { resUsuarios && 
                        resUsuarios.map((usuario, key) =>(
                            <tr key={key}>
                                <td>{usuario.name.toLowerCase()}</td>
                                <td>{usuario.email.toLowerCase()}</td>
                            </tr>
                        ))
                    }   
                </tbody>
            </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUserFinder
