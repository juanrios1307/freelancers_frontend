import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.scss'
import Axios from "axios";

function NavBar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [profesion,setProfesion] =useState('');

    const url='https://peaceful-ridge-86113.herokuapp.com/api/main'
    //const url='http://localhost:5000/api/main'

    const buscar = (e) => {
        e.preventDefault()

        const config = {
            method: 'get',
            url: url,
            headers: {
                'profesion': profesion
            }
        };

        Axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        QuickServices
                        <i  href={'WHITE PNG'} />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <form className="form-inline my-2 my-lg-0" onSubmit={buscar}>
                                <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search"
                                       onChange={e => setProfesion(e.target.value)}/>
                                <button className="my-sm-0" type="submit">Buscar</button>
                            </form>
                        </li>

                        <li className='nav-item'>
                            <Link to='/sing-up' className='nav-links' onClick={closeMobileMenu} >
                                Iniciar Sesión / Registro
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;