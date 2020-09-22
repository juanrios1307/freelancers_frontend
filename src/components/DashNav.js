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
                                    <Link to={item.path} >
                                        {item.icon} <span>{item.title}</span>
                                    </Link>
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