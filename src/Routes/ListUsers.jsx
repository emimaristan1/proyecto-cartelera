import axios from 'axios';
import {useEffect, useState} from 'react'

//const data = 'https://bakend-proyecto-cartelera.herokuapp.com/users';
//const data = 'users';

function ListUsers() {
    const [usuarios, setTodos] = useState([])
    
    const consumeApiUsers = async() => {
       await axios.get('/users')
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
            { !usuarios ? 'Cargando...' : 
                usuarios.map((usuario, key) =>(
                    <div key={key.toString()}>
                        <h3>{usuario.name}</h3>
                        <p>{usuario.email}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ListUsers
