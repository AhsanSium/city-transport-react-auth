import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {

    const classes = useStyles();

    return (
        // <nav>
        //         <Link to="/home"> Home </Link>
        //         <Link to="/destination"> Destination </Link>
        //         <Link to="/login"> Login </Link>
        // </nav>

        <div className={classes.root}>
            <AppBar position="static">
                <Container maxWidth="xl">
                <Toolbar>
                <Link style={{color:'white',textDecoration:'none'}} to='/home'>    
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                </Link>
                <Typography variant="h6" className={classes.title}>
                    City Transport
                </Typography>
               
                    <Link style={{color:'white',textDecoration:'none'}} to="/home"> <Button color="inherit">Blog</Button> </Link>
                    <Link style={{color:'white',textDecoration:'none'}} to="/destination"> <Button color="inherit">Destination</Button> </Link>
                    <Link style={{color:'white',textDecoration:'none'}} to="/login"><Button color="inherit">Login</Button></Link>
                
                
                </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;