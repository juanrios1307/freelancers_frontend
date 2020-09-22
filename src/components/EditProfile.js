import React, {useState} from 'react';
import '../assets/css/EditProfile.css';
import Axios from "axios";
import Swal from "sweetalert2";


function EditProfile() {


    const [nombre,setNombre] =useState('');
    const [telefono,setTelefono] =useState('');
    const [ciudad,setCiudad] =useState('');

    const [newNombre,setNewNombre] =useState('');
    const [newTelefono,setNewTelefono] =useState('');
    const [newCiudad,setNewCiudad] =useState('');

    const url='https://peaceful-ridge-86113.herokuapp.com/api/users'
   // const url='http://localhost:5000/api/users'

    React.useEffect(async () =>{

       user()

    },[]);

    const user= async () => {

        const token = localStorage.getItem("token")

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
            }
        };

        const res = await Axios(config);

        const data = res.data.data;

        setNombre(data.nombre);
        setCiudad(data.ciudad);
        setTelefono(data.telefono)

    }

    const actualizar = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token")

        var data = '';

        if (newNombre.length > 0) {
            console.log(JSON.stringify(newNombre));
            data = ({"nombre": newNombre});
            setNewNombre('')
        } else if (newTelefono.length > 0) {
            console.log(JSON.stringify(newTelefono));
            data = ({"telefono": newTelefono});
            setNewTelefono('')
        } else if (newCiudad.length > 0) {
            console.log(JSON.stringify(newCiudad));
            data = ({"ciudad": newCiudad});
            setNewCiudad('')
        }

        var config = {
            method: 'put',
            url: url,
            headers: {
                'access-token': token
            },
            data: data
        };

        const response=await Axios(config)

        const mensaje = response.data.data


        window.location.reload(false);
    }


    return (
       <div className="edit">
           <form className="form" onSubmit={actualizar}>
               <div className="f-group">
                   <label htmlFor="username">Nombre Completo: </label>
                   <input type="text" name="username" placeholder={nombre}   onChange={e => setNewNombre(e.target.value)} />
               </div>
               <div className="f-group">
                   <label htmlFor="phone">Teléfono: </label>
                   <input type="phone" name="phone" placeholder={telefono} onChange={e => setNewTelefono(e.target.value)} />
               </div>
               <div className="f-group">
                   <label htmlFor="city">Ciudad: </label>
                   <input type="text" name="ciudad" placeholder={ciudad} onChange={e => setNewCiudad(e.target.value)} />
               </div>
               <div className="ftr">
                   <button type="submit" className="btn">
                       Editar
                   </button>
               </div>
           </form>
       </div>
    );
}

export default EditProfile;