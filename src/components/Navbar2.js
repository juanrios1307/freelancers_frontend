import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {Button} from "./Button";

import '../assets/css/Navbar2.css'

function Navbar2(){
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobilMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        } else {
          setButton(true);
        }
    };

    useEffect(() => {
        showButton()
    },[])

    window.addEventListener('resize', showButton);

    return(
        <>
            <nav className="navbar" >
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobilMenu}>
                        QuickServices
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobilMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobilMenu}>
                                Services
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobilMenu}>
                                Products
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sing-up' className='nav-links-mobile' onClick={closeMobilMenu}>
                                Sing Up
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>SING UP</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar2