import React from 'react';
import '../assets/css/EditProfile.css';


function EditProfile() {
    return (
       <div className="edit">
           <form className="form">
               <div className="form-group">
                   <label htmlFor="username">Nombre Completo: </label>
                   <input type="text" name="username" placeholder="Nombre completo" required/>
               </div>
               <div className="form-group">
                   <label htmlFor="email">Correo Electrónico: </label>
                   <input type="email" name="email" placeholder="Correo Electrónico" required/>
               </div>
               <div className="form-group">
                   <label htmlFor="password">Contraseña: </label>
                   <input type="password" name="password" placeholder="Contraseña" required/>
               </div>
               <div className="form-group">
                   <label htmlFor="phone">Teléfono: </label>
                   <input type="tel" name="phone" placeholder="Teléfono" required/>
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