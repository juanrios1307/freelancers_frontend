import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar2.scss'
import Logo from '../assets/images/Logo/WHITE PNG.png'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

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
                            <Link
                                to='/sing-up'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >Iniciar Sesión / Registro
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search"/>
                                <button className="my-sm-0" type="submit">Buscar</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;