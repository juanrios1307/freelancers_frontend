import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from "../components/NavbarD";
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
    }
}));

const data = [
    {
        id:1,
        Publicacion:
            "Como Hacer un Split en React JS || React Split Pane || Tutorial en Español (2020)",
        fecha: "6 de sep. 2020",
        visualizaciones: 32,
        imagen: require("../assets/images/split.webp"),
    },
    {
        id:2,
        Publicacion:
            "Cómo Solucionar Error al Crear Applicación de React JS",
        fecha: "5 de sep. 2020",
        visualizaciones: 31,
        imagen: require("../assets/images/error.webp"),
    },
    {
        id:3,
        Publicacion:
            "Cómo Utilizar Forever en Node JS || Ejecutar Node JS en Segundo Plano || Background Node JS",
        fecha: "4 de sep. 2020",
        visualizaciones: 21,
        imagen: require("../assets/images/forever.webp"),
    },
];

function Dashboard(props) {
    const classes= useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Navbar/>
                </Grid>


                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <CardsHeader icono={<PersonIcon className={classes.iconos}/>} titulo="NOMBRE" texto="Pedro Perez" color="linear-gradient(90deg, rgb(29, 115, 91) 0%, rgb(40, 121, 19) 100%)" font="white"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <CardsHeader icono={<PublicIcon className={classes.iconos}/>} titulo="Ciudad" texto="Medellín" color="linear-gradient(90deg, rgb(29, 115, 91) 0%, rgb(40, 121, 19) 100%)" font="white"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <CardsHeader icono={<AssessmentIcon className={classes.iconos}/>} titulo="CANTIDAD DE PUBLICACIONES" texto="5" color="linear-gradient(90deg, rgb(29, 115, 91) 0%, rgb(40, 121, 19) 100%)" font="white"/>
                </Grid>

                <Grid container spacing={1} className={classes.container} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <EditProfile/>
                </Grid>

                <Grid item xs={0} sm={0} md={1} lg={1} xl={1}></Grid>

                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} className={classes.containerGrafica}>
                    <Graphics />
                </Grid>


                <Grid item xs={12} className={classes.containerTabla}>
                    <TableMaterial data={data}/>
                </Grid>


            </Grid>
        </div>
    );
}

export default Dashboard;