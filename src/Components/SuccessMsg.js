import React from 'react'
import { Alert } from 'react-bootstrap';

function SuccessMsg(props) {
    return(
        <Alert variant='success'>
            {props.msg}
        </Alert>
    )
}

export default SuccessMsg
