import axios from 'axios';
import {useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'

//const data = 'https://bakend-proyecto-cartelera.herokuapp.com/users';
//const data = 'users';

function ListUsers() {
    const [usuarios, setTodos] = useState([])
    
    const consumeApiUsers = async() => {
        await axios.get('/users/list')
        .then(res=>{
            setTodos(res.data)
        })
    }

    useEffect(() => {
        async function fetchData(){
            await consumeApiUsers()
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    { !usuarios ? 'Cargando...' : 
                        usuarios.map((usuario, key) =>(
                            <tr key={key}>
                                <td>{usuario.name.toLowerCase()}</td>
                                <td>{usuario.email.toLowerCase()}</td>
                            </tr>
                        ))
                    }   
                </tbody>
            </Table>
        </div>
    )
}

export default ListUsers
