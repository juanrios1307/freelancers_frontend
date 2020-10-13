import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../assets/css/DashNav.css';
import { IconContext } from 'react-icons';

function DashNav() {
    const [sidebar, setSidebar] = useState(false);
    const [click, setClick] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const render = () => {
        window.location.reload(false);
    };

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='dashnav'>
                    <Link to='#' className='m-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <div className='name'>
                        QuickServices
                    </div>
                    <ul className='nv-menu'>
                        <div className="buscador">
                            <li className='nv-item'>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Buscar"
                                           aria-label="Search"/>
                                    <Link className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                                       aria-haspopup="true" aria-expanded="false">Categorias</Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" href="#">Profesión</Link>
                                        <Link className="dropdown-item" href="#">Anuncio</Link>
                                    </div>
                                    <button className="my-sm-0" type="submit">
                                        Buscar
                                    </button>
                                </form>
                            </li>
                        </div>
                        <li className='nv-item'>
                            <Link className="nv-links" data-toggle="dropdown" href="#" role="button"
                                  aria-haspopup="true" aria-expanded="false">
                                UN
                            </Link>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/dashboard">Ver Perfil</Link>
                                <Link className="dropdown-item" to="#">Cerrar Sesión</Link>
                            </div>
                        </li>

                    </ul>
                </div>

                <nav className={sidebar ? 'n-menu active' : 'n-menu'}>
                    <ul className='n-menu-items' onClick={showSidebar}>
                        <li className='nb-toggle'>
                            <Link to='#' className='m-bars'>
                                <AiIcons.AiOutlineClose />
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

        </>
    );
}

export default DashNav;