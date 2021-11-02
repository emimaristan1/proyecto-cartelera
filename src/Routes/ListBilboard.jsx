import axios from 'axios';
import {useEffect, useState} from 'react'

//const data = 'https://bakend-proyecto-cartelera.herokuapp.com/users';
//const data = 'users';

function ListBilboard() {
    const [carteleras, setTodas] = useState([])
    
    const consumeApiBilboards = async() => {
       await axios.get('/bilboard/list')
       .then(res=>{
            setTodas(res.data)
       })
    }

    useEffect(() => {
        async function fetchData(){
            await consumeApiBilboards()
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Mis carteleras</h1>
            { !carteleras ? 'Cargando...' : 
                carteleras.map((cartelera, key) =>(
                    <div key={key.toString()} className="alert alert-info">
                        <h4 className="alert-heading fs-3" onClick>{cartelera.projectName}</h4>
                        <p className="alert-heading fs-5">{cartelera.description}</p>
                        <p className="mb-0 fs-6 bold fw-bold">{cartelera.adminEmail}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ListBilboard
