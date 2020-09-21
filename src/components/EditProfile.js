import React, {useState} from 'react';
import '../assets/css/EditProfile.css';
import Axios from "axios";


function EditProfile() {


    const [nombre,setNombre] =useState('');
    const [telefono,setTelefono] =useState('');
    const [ciudad,setCiudad] =useState('');

    //const url='https://peaceful-ridge-86113.herokuapp.com/api/users'
    const url='http://localhost:5000/api/users'

    React.useEffect(async () =>{

        const token=localStorage.getItem("token")

        const config = {
            method: 'get',
            url: url,
            headers: {
                'access-token': token
            }
        };

        const res=await Axios(config);

        const data = res.data.data;

        setNombre(data.nombre);
        setCiudad(data.ciudad);
        setTelefono(data.telefono)



    },[]);

    return (
       <div className="edit">
           <form className="form">
               <div className="form-group">
                   <label htmlFor="username">Nombre Completo: </label>
                   <input type="text" name="username" placeholder={nombre} required/>
               </div>

               <div className="form-group">
                   <label htmlFor="password">Contraseña: </label>
                   <input type="password" name="password" placeholder="Contraseña" required/>
               </div>
               <div className="form-group">
                   <label htmlFor="phone">Teléfono: </label>
                   <input type="phone" name="phone" placeholder={telefono} required/>
               </div>
               <div className="form-group">
                   <label htmlFor="phone">Teléfono: </label>
                   <input type="text" name="ciudad" placeholder={ciudad} required/>
               </div>
               <div className="footer">
                   <button type="submit" className="btn">
                       Editar
                   </button>
               </div>
           </form>
       </div>
    );
}

export default EditProfile;