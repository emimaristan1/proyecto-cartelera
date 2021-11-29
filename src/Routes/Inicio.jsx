import React, { useState, useEffect, Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

class Inicio extends Component {
    constructor(props){
        super(props)
        this.state={
            user: this.props.user,
            isLoggedIn: props.isLoggedIn,
            bilboad:'',
            listbilboads:[]
        }
    }

    render() {
        return (
            <>
                {this.state.isLoggedIn? <UserGreeting user={this.state.user} blibloards={this.state.listbilboads}/> : <GuestGreeting />}
            </>
        )
    }
}

function UserGreeting(props){
    const [isLoading, setLoading] = useState(true);
    const [bilboards, setBilboards] = useState([]);


    useEffect(() => {
        let source = axios.CancelToken.source();

        const head={
            cancelToken: source.token,
            headers: {"x-access-token": localStorage.getItem("token")}
        }
        axios.get('/bilboards/my', head).then(res=>{
            setBilboards(res.data)
            setLoading(false)
        });
        return function () {
            source.cancel("Cancelling in cleanup");
        };
    }, [])


    if(isLoading){
        return (
            <>
                <h2>Bienvenido {props.user.name}</h2>
                <h3>{props.user.email}</h3>
                <br />
                <p>Loading...</p>
            </>
        )
    }
    return (
        <>
            <h2>Bienvenido {props.user.name}</h2>
            <h4>{props.user.email}</h4>
            <br />
            <Card style={{ width: '18rem' }}>
                <ListGroup >
                    {bilboards.map((cartelera, key) =>(
                        <ListGroup.Item key={key.toString()} >
                            <a href={"/bilboard/" + cartelera._id}>
                                {cartelera.projectName}
                            </a>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            
        </>
    )
}

function GuestGreeting(){
    return (
        <>
            <h1>Bienvenido a Cartelera! Inicie sesion para utilizar la aplicacion :)</h1>
            <br />
        </>
    )
}

export default Inicio;