import React, {useEffect, useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link,Redirect } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../assets/css/DashNav.css';
import { IconContext } from 'react-icons';
import Axios from "axios";

function DashNav() {
    const [sidebar, setSidebar] = useState(false);
    const [nombre,setNombre] =useState('.');

    const [profesion, setProfesion] = useState('');
    const [categoria, setCategoria] = useState('workers');

    const showSidebar = () => setSidebar(!sidebar);



    const cerrarSesion = () => {
        localStorage.removeItem("token");
    }

    //const url1 = 'https://peaceful-ridge-86113.herokuapp.com/api/main'
    const url1='http://localhost:5000/api/main'

    const buscar = () => {
        const config = {
            method: 'get',
            url: url1,
        };

        Axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //const url='https://peaceful-ridge-86113.herokuapp.com/api/users'
    const url='http://localhost:5000/api/users'

    const name = async () => {
        const token = localStorage.getItem("token")
        if (token) {
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
        }
    }

    const buscarProfesion = () => {
        localStorage.setItem("profesion", profesion.toLowerCase())
        localStorage.setItem("profesionAux", profesion.toLowerCase())
        localStorage.setItem("categoria",categoria)
        localStorage.setItem("categoriaAux",categoria)
    }

    useEffect(() => {
        buscar()
        name()
    }, []);

    if (localStorage.getItem("profesion")) {
        if(localStorage.getItem("categoria") === "workers"){

            return (
                <Redirect to="/workers"/>
            )
        }else{

            return (
                <Redirect to="/anunces"/>
            )
        }
    } else {

        return (
                <IconContext.Provider value={{color: '#fff'}}>
                            <div className='dashnav'>
                                <Link to='#' className='m-bars'>
                                    <FaIcons.FaBars onClick={showSidebar}/>
                                </Link>
                                <div className='name'>
                                    QuickServices
                                </div>
                                <ul className='nv-menu'>

                                    <div className="buscador">
                                        <li className='nv-item'>
                                            <form className="form-inline my-2 my-lg-0" onSubmit={buscarProfesion}>
                                                <input className="form-control mr-sm-2" type="search"
                                                       placeholder="Buscar"
                                                       aria-label="Search"
                                                       onChange={e => setProfesion(e.target.value)}/>

                                                <select onChange={e => setCategoria(e.target.value)} className="nav-link dropdown-toggle form-control">
                                                    <option  value="workers" >Profesión</option>
                                                    <option  value="anunces" >Anuncio</option>
                                                </select>

                                                <button className="my-sm-0" type="submit">
                                                    Buscar
                                                </button>
                                            </form>

                                        </li>
                                    </div>
                                    <li className='nv-item'>
                                        <button className="nv-links" data-toggle="dropdown" href="#" role="button"
                                                aria-haspopup="true" aria-expanded="false">
                                            {nombre[0].toUpperCase()}
                                        </button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="/dashboard">Ver Perfil</a>
                                            <a className="dropdown-item" onClick={cerrarSesion} href="/">
                                                Cerrar Sesión
                                            </a>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                            <nav className={sidebar ? 'n-menu active' : 'n-menu'}>
                                <ul className='n-menu-items' onClick={showSidebar}>
                                    <li className='nb-toggle'>
                                        <Link to='#' className='m-bars'>
                                            <AiIcons.AiOutlineClose/>
                                        </Link>
                                    </li>
                                    {SidebarData.map((item, index) => {
                                        return (
                                            <li key={index} className={item.cName}>
                                                <a href={item.path}>
                                                    {item.icon} <span>{item.title}</span>
                                                </a>
                                            </li>

                                        );
                                    })}

                                </ul>

                            </nav>
                        </IconContext.Provider>

                );
            }

}

export default DashNav;