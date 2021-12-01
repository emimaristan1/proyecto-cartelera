import { Button } from 'react-bootstrap';
import React from 'react'

export default function ListTask(props) {
    return (
        <div>
            { props.tasks && props.tasks.map((task, key) => (
                    <div key={key} className="alert alert-secondary" style={{margin: "10px", maxWidth: "300px", float: "left", minWidth: "250px"}}>
                        <h5>{task.titulo}</h5>
                        <p className="alert-heading fs-6">{task.descripcion}</p>
                        <Button onClick={ ()=> props.completeTask(task._id)} style={{float: "right", marginLeft: '5px'}} className="btn btn-success btn-sm">Completar</Button>
                    </div>
                ))}
        </div>
    )
}

