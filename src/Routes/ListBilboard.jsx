import axios from 'axios';
import {useEffect, useState} from 'react'

//const data = 'https://bakend-proyecto-cartelera.herokuapp.com/users';
//const data = 'users';

function ListBilboard() {
    const [carteleras, setTodas] = useState([])
    
    const consumeApiBilboards = async() => {
       await axios.get('/bilboards/list')
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
                        <a href={"/bilboard/" + cartelera._id}>
                        {/* <a href={"/bilboard/" + encodeURI(cartelera.projectName)}> */}
                            <h4 className="alert-heading fs-3">{cartelera.projectName}</h4>
                        </a>
                        <p className="alert-heading fs-5">{cartelera.description}</p>
                        <p className="mb-0 fs-6 bold fw-bold">{cartelera.adminEmail}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ListBilboard
