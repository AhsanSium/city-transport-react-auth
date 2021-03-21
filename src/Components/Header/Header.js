import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin:'5px'
  },
}));

const Header = () => {

    const classes = useStyles();
    const [user] = useContext(UserContext);

    return (

        <div className={classes.root}>
            <AppBar position="static" style={{padding:'10px', backgroundColor:'#3f51b56e'}}>
                <Container maxWidth="xl">
                <Toolbar>
                <Link style={{color:'white',textDecoration:'none'}} to='/home'>    
                  <img style={{width:'110px', padding:'5%', display:'flex'}} src={logo} alt=""/>
                </Link>
                <Typography variant="h5" className={classes.title}>
                    City Transport
                </Typography>
               
                    <Link style={{color:'white',textDecoration:'none'}} to="/home"> <Button color="inherit">Home</Button> </Link>
                    <Link style={{color:'white',textDecoration:'none'}} to="/destination"> <Button color="inherit">Destination</Button> </Link>
                    {
                      !user.isSignedIn &&
                    <Link style={{color:'white',textDecoration:'none',backgroundColor:'salmon',borderRadius:'10px'}} to="/login"><Button color="inherit">Login</Button></Link>
                    }
                    {
                      user.isSignedIn &&
                       <Link style={{color:'white',textDecoration:'none',backgroundColor:'salmon',borderRadius:'10px'}} to="/login"><Button color="inherit"> {user.name}</Button></Link>

                    }
                
                </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;