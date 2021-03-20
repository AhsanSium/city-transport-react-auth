import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import bikeImg from '../../images/bike.png';
import carImg from '../../images/car.png';
import busImg from '../../images/bus.png';
import trainImg from '../../images/train.png';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const Home = () => {

    const classes = useStyles();

    const [user, setUser] = useContext(UserContext);

    const handleCardClick = (name) => {
        console.log(name);
        const newUserInfo = { ...user };
            newUserInfo.transport = name;
            setUser(newUserInfo);
            console.log(newUserInfo);
    }

    return (
        <Container style={{marginTop:'20%'}} maxWidth="lg">
            <Grid  container spacing={3} >
                <Grid  onClick={()=>handleCardClick('bike')} item xs={12} sm={3}>
                    <Paper style={{cursor:'pointer'}} className={classes.paper}>
                        <img style={{width:'100%',height:'auto'}} src={bikeImg} alt="Bike Img"/>
                        Bike
                    </Paper>
                </Grid>
                <Grid onClick={()=>handleCardClick('car')} item xs={12} sm={3}>
                    <Paper style={{cursor:'pointer'}} className={classes.paper}>
                    <img style={{width:'100%'}} src={carImg} alt="Car Img"/>
                        Car
                    </Paper>
                </Grid>
                <Grid onClick={()=>handleCardClick('bus')} item xs={12} sm={3}>
                    <Paper style={{cursor:'pointer'}} className={classes.paper}>
                        <img style={{width:'100%'}} src={busImg} alt="Bus Img"/>
                        Bus
                    </Paper>
                </Grid>
                <Grid onClick={()=>handleCardClick('train')} item xs={12} sm={3}>
                    <Paper style={{cursor:'pointer'}} className={classes.paper}>
                        <img style={{width:'100%'}} src={trainImg} alt="Train Img"/>
                        Train
                        </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;