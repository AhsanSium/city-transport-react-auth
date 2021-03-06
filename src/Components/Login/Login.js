import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { Button, Container, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Login.css';
import google from '../../images/google.png';




if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const Login = () => {

    const [user, setUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);

    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {

        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                
                const { displayName, email } = result.user;
                // const signedInUser = { name: displayName, email };
                const newUserInfo = { ...user };
                newUserInfo.name = displayName;
                newUserInfo.email = email;
                newUserInfo.success = true;
                newUserInfo.isSignedIn = true;
                setUser(newUserInfo);
                history.replace(from);
                console.log(newUserInfo, user);
            }).catch((error) => {
                // // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // // The email of the user's account used.
                // var email = error.email;
                // // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;

                const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);

            });
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleChange = (event) => {
        let isFormValid = true;

        if (event.target.name === 'email') {
            isFormValid = validateEmail(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo.error = '';
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
            console.log(user);
        }
        else {
            const newUserInfo = { ...user };
            newUserInfo.error = 'Invalid Input Try Again';
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.isSignedIn= true;
                    setUser(newUserInfo);
                    updateUserName(user.name);   
                    console.log('User Created',res);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.isSignedIn= true;
                    newUserInfo.name = res.user.displayName;
                    setUser(newUserInfo);
                    console.log('User Info', res.user);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        event.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log(name);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const classes = useStyles();

    return (
        <Container maxWidth="md">

            <div className='form-cover'>
                {
                    user.isSignedIn &&
                    <div>
                        <p> Welcome, {user.name}! </p>
                        
                    </div>
                }
                <h2>{newUser ? 'Sign Up' : 'Login'} </h2>
                <FormGroup   className={classes.root} autoComplete="off">
                <form onSubmit={handleSubmit} action="">  
                    {newUser &&
                        <TextField onBlur={handleChange} required id="filled-secondary" label="Name" variant="filled" color="secondary" name="name" />

                    }
                    <TextField onBlur={handleChange} required id="filled-secondary" label="E-mail" variant="filled" color="secondary" name="email" />
                    
                    <TextField onBlur={handleChange} required id="filled-secondary" label="Password" variant="filled" color="secondary" name="password" type="password"  />
                    
                    <Button  type="submit" variant="contained" color="primary">
                        {newUser?'Sign Up': 'Sign in'}
                    </Button>
                    
                    {/* <input onClick={handleSubmit} value={newUser?'Sign Up': 'Sign in'} type="submit" /> */}
                    
                    <div style={{display:'flex', margin:'5px' }}>
                        <input   type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                        <label  htmlFor="newUser">New User Sign Up !</label>
                    </div>
                </form>
                </FormGroup>
                    
                    
                    <Button onClick={handleGoogleSignIn} variant="contained" color="secondary">
                        <img style={{width:'5%',height:'50%'}} src={google} alt="img"/>  Sign in
                    </Button>
                    
                    <p style={{ color: "red" }}>{user.error}</p>
                    {
                        user.success &&
                        <p style={{ color: "green" }}>User {newUser ? 'Created' : 'Logged In'} Successfully ! </p>
                    }
            </div>
        </Container>
    );
};

export default Login;