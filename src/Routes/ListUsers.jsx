import React, {useEffect, useState} from 'react'

function ListUsers() {

    const data = 'https://bakend-proyecto-cartelera.herokuapp.com/users';
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
                    return (
                        <div>
                            <h3>{usuario.name}</h3>
                            <p>{usuario.email}</p>
                        </div>
                    )

                }) }
        </div>
    )
}

export default ListUsers
