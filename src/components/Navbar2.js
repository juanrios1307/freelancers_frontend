import React, {useState, useEffect} from "react";
import {Link, Redirect, withRouter} from 'react-router-dom'
import {Button} from "./Button";

import '../assets/css/Navbar2.scss'
import Axios from "axios";

function Navbar2(){
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobilMenu = () => setClick(false);

    const [profesion,setProfesion] =useState('');

    React.useEffect(() =>{

        const url='https://peaceful-ridge-86113.herokuapp.com/api/main'

        Axios.get(url)
            .then(res => {

                const profesion = res.data.data;
                setProfesion({profesion});
                console.log("Profesiones"+JSON.stringify(profesion))

            })
    },[]);

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
                            <Link to='/login-register' className='nav-links' onClick={closeMobilMenu}>
                                Services
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>Inicio Sesión / Registro</Button>}
                </div>
            </nav>
        </>
    )
}

export default withRouter(Navbar2)