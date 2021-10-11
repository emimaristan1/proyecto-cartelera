import React, {useEffect, useState} from 'react'

function ListUsers() {

    const data = 'https://bakend-proyecto-cartelera.herokuapp.com/api/users';
    const [usuarios, setTodos] = useState()
    const consumeApiUsers = async() => {
        const response = await fetch(data)
        const responseJson = await response.json()
        setTodos(responseJson)
    }

    useEffect(() => {
        consumeApiUsers()
    }, [])

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            { !usuarios ? 'Cargando...' : 
                usuarios.map((usuario, index) =>{
                    return <h3>{usuario.name} - {usuario.email} </h3>
                }) }
        </div>
    )
}

export default ListUsers
