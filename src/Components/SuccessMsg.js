import React from 'react'
import { Alert } from 'react-bootstrap';

function SuccessMsg(props) {
    return(
        <Alert variant='success' onClose={() => props.setdata('')} dismissible>
            {props.msg}
        </Alert>
    )
}

export default SuccessMsg
