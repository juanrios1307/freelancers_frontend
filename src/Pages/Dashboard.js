import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DashNav from "../components/DashNav.js";
import 'fontsource-roboto';
import '../assets/css/Dashboard.css';
import PersonIcon from '@material-ui/icons/Person';
import PublicIcon from '@material-ui/icons/Public';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CardsHeader from '../components/CardsHeader';
import Cards from '../components/Cards';
import Graphics from '../components/Graphics';
import TableMaterial from '../components/TableMaterial';
import EditProfile from "../components/EditProfile";
import Axios from "axios";
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";

const useStyles= makeStyles(()=>({
    root:{
        flexGrow: 1
    },
    iconos:{
        color: 'white'
    },
    container:{
        paddingTop: '40px',
        alignItems: 'center'
    },
    containerGrafica:{
        marginTop: '40px'
    },
    containerTabla:{
        marginTop: '40px'
    },
    containerButton:{
        alignItems: 'center'
    }
}));

function Dashboard(props) {
    const classes= useStyles();

    const [nombre,setNombre] =useState('...');
    const [ciudad,setCiudad] =useState('...');
    const [anuncios,setAnuncios] =useState('...');

    const url='https://peaceful-ridge-86113.herokuapp.com/api/users'
    //const url='http://localhost:5000/api/users'

    React.useEffect(async () =>{
        getData()

    },[]);

    const getData =async () => {
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
            setCiudad(data.ciudad);
            setAnuncios(data.Anunces.length)
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <DashNav/>
                </Grid>


                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <CardsHeader icono={<PersonIcon className={classes.iconos}/>} titulo="Nombre" texto={nombre} color="linear-gradient(90deg, rgb(29, 115, 91) 0%, rgb(40, 121, 19) 100%)" font="white"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <CardsHeader icono={<PublicIcon className={classes.iconos}/>} titulo="Ciudad" texto={ciudad} color="linear-gradient(90deg, rgb(29, 115, 91) 0%, rgb(40, 121, 19) 100%)" font="white"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <CardsHeader icono={<AssessmentIcon className={classes.iconos}/>} titulo="Cantidad de Anuncios" texto={anuncios} color="linear-gradient(90deg, rgb(29, 115, 91) 0%, rgb(40, 121, 19) 100%)" font="white"/>
                </Grid>

                <Grid container spacing={1} className={classes.container} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <EditProfile/>
                </Grid>

                <Grid item xs={0} sm={0} md={1} lg={1} xl={1}></Grid>

                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.containerGrafica}>
                    <Graphics />
                </Grid>


                <Grid item xs={12} className={classes.containerTabla}>
                    <TableMaterial/>
                </Grid>

                <Grid item xs={12} className='dashButtonDiv'>
                    <a href='/signupworker'>
                        <button className='buttonDash'>
                            Registrarse como trabajador
                        </button>
                    </a>
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;