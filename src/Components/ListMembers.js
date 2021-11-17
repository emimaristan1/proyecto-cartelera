import React from 'react'

function ListMembers(bilboardId) {
    const [members, setMembers] = useState([])

    const search = (bilboardId) => {
        axios.get('/bilboards/' + bilboardId).then(res=>{ //trae del backend el bilboard segun su id
            const bilboard = res.data

            /* console.log(bilboard); */
            bilboard.members.forEach(memberId => {

                axios.get('/users/'+memberId)
                .then(user => {
                    setMembers(user.data)
                })
            });
        });
    }
    return (
        <div>
            
        </div>
    )
}

export default ListMembers
