import { Button, Container, FormGroup, Input } from '@material-ui/core';
import React, { useState } from 'react';
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

    const [form , setForm] = useState({
        from:'',
        to:''    
    });

    const classes = useStyles();

    
    let destination;
    const showDestination = () => {
        console.log('Destination');
        const from = form.from;
        const to = form.to;
        if(from && to){
            destination = true;
            console.log(destination);
        }
        else{
            destination = false;
            alert('Submit All Field');
        }
    }
    
    const handleChange = (event) => {
        if (event.target.name === 'from') {
            const newForm = { ...form };
            newForm.from = event.target.value;
            setForm(newForm);    
        }
        if (event.target.name === 'to') {
            const newForm = { ...form };
            newForm.to = event.target.value;
            setForm(newForm);
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
                            <p>{form.from}</p>
                            <p>{form.to}</p>
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