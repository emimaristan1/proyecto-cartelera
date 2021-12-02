import React from 'react'
import { Card, ListGroup  } from 'react-bootstrap';
import eliasImg from '../Img/Elias.jpg'
import emiImg from '../Img/Emi.jpg'

export default function About(props) {
    const client = props.client;

    if(client){
        return <Clientes />
    }

    return <Desarrolladores />
    
}

function Clientes(){
    return(
        <div style={{margin: "auto", width: "fit-content"}}>
            <h1>Clientes</h1>
            <br />
            <ListGroup>
                <ListGroup.Item>Emiliano Corbalan</ListGroup.Item>
                <ListGroup.Item>Agustin Acosta</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

function Desarrolladores(){
    return (
        <div style={{margin: "auto", width: "fit-content"}}>
            <h1>Equipo de desarrollo</h1>
            <ListGroup horizontal>
                <ListGroup.Item>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={eliasImg} />
                        <Card.Body>
                            <Card.Title>Elías Bianchi</Card.Title>
                            <Card.Text>
                                Desarrollador web y diseñador grafico.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={emiImg} />
                        <Card.Body>
                            <Card.Title>Emiliano Maristan</Card.Title>
                            <Card.Text>
                                Desarrollador y QA Automation mas vale.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}