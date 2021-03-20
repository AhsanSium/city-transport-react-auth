import { Button, Container, FormGroup, Input } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '15%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



const Destination = () => {

    const classes = useStyles();
    
    var from = '';
    var to = '';

    const handleChange = (event) => {
        console.log(from, to);
        if (event.target.name === 'from') {
            from = event.target.value;
        }
        if (event.target.name === 'to') {
            to = event.target.value;
        }
        console.log(from, to);
    }
    let destination = false;
    const showDestination = () => {
        console.log('Destination');
        if(from !== '' && to !== ''){
            destination = true;
            console.log(destination);
        }
        else{
            destination = false;
            alert('Submit All Field');
        }
    }

    return (
        <Container maxWidth="lg">
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <FormGroup>
                            <Input onBlur={handleChange} name="from" type="text" placeholder="From"></Input>
                            <Input onBlur={handleChange} name="to" type="text" placeholder="To"></Input>
                            <Button onClick={showDestination}> Submit </Button>
                        </FormGroup>
                        {
                        <div>
                            <p>From {from}</p>
                            <p>{to}</p>
                        </div>
                        }
                    </Paper>
                    
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>Map Goes Here</Paper>
                </Grid>
            </Grid>    
            </div>
                   
        </Container>
    );
};

export default Destination;