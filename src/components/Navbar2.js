import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {Button} from "./Button";

import '../assets/css/Navbar2.scss'
import Axios from "axios";

function Navbar2(){
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);

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

            <nav className="navbar" >
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">QuickServices</Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' >Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links'>Services</Link>
                        </li>
                    </ul>
                   <Button buttonStyle='btn--outline'>
                        <Link to='/login' className='nav-links'>Login / Sign Up</Link>
                   </Button>
                </div>
            </nav>
    )
}

export default Navbar2