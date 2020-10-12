import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'n-text',

    },
    {
        title: 'Guardadas',
        path: '/saves',
        icon: <IoIcons.IoIosPaper />,
        cName: 'n-text'
    },
    {
        title: 'Mis Anuncios',
        path: '/misanuncios',
        icon: <IoIcons.IoIosPaper />,
        cName: 'n-text'
    },

   {
        title: 'Principal',
        path: '/',
        icon: <FaIcons.FaCartPlus />,
        cName: 'n-text'
    },
   {
        title: 'Buscar',
        path: '/workers',
        icon: <IoIcons.IoMdPeople />,
        cName: 'n-text'
    },
    {
        title: 'Chat',
        path: '/chat',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'n-text'
    },
    {
        title: 'Ajustes',
        path: '/settings',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'n-text'
    }
];