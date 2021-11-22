import axios from 'axios';
import React from 'react'
import { Button, Modal, Table } from 'react-bootstrap';

function ModalInvitation(props) {

    function answer(invitation, option){
        const config={
            memberId: props.user._id,
            invitationId: invitation,
            option: option
        }
        console.log(config);
        axios.post('/invitation/answer', config)
        .then(response=> {
            alert(response.data)
            setTimeout(() => {  
                window.location.reload(false);
            }, 800);

            /* class MyComponent extends React.Component{
                shouldComponentUpdate(nextProps){
                  return nextProps.value !== this.props.value;
                }
                render(){
                  return (
                   <div>{"My Component " + this.props.value}</div>
                  );  
               }
              } */
        },err => {
            console.log(err);
        })

    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Invitación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped size="sm">
                    <tbody>
                        {props.invitations && 
                        props.invitations.map((invitation,key) => (
                            <tr key={key}>
                                <td>{invitation.bilboardName}</td>
                                {invitation.aprobe===0 ? 
                                    <td>
                                        <Button onClick={(e) => answer(invitation._id, "true")} variant="success">✔</Button>
                                        <Button onClick={(e) => answer(invitation._id, "false")} variant="danger">❌</Button>
                                    </td> : 
                                    invitation.aprobe===1 ? 
                                        <td>Aprobada</td> : 
                                        <td>Rechazada</td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalInvitation
