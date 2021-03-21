import { Button, Container, FormGroup, Input } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import data from '../../FakeData.json';
import { UserContext } from '../../App';
import bike from '../../images/Frame.png';
import car from '../../images/Frame-2.png';
import bus from '../../images/Frame-1.png';
import train from '../../images/Group.png';
import person from '../../images/peopleicon.png';


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

    const [form, setForm] = useState({
        from: '',
        to: '',
        date: '',
        destination: false,
        image: '',
        storeData: []
    });

    const [user, setUser] = useContext(UserContext);


    const classes = useStyles();

    useEffect(() => {
        let newForm = { ...form };
        let newStoreData = [];
        console.log(user.transport);
        if (user.transport === 'bike') {
            newForm.image = bike;
            data.map(singleData => newStoreData.push(singleData.bike))
        }
        if (user.transport === 'car') {
            newForm.image = car;
            data.map(singleData => newStoreData.push(singleData.car))
        }
        if (user.transport === 'bus') {
            newForm.image = bus;
            data.map(singleData => newStoreData.push(singleData.bus))
        }
        if (user.transport === 'bike') {
            newForm.image = train;
            data.map(singleData => newStoreData.push(singleData.train))
        }
        newForm.storeData = newStoreData;
        setForm(newForm);
        console.log(newStoreData);
    }, [user.transport])



    const showDestination = () => {
        console.log('Destination');
        const from = form.from;
        const to = form.to;
        if (from && to) {
            const newForm = { ...form };
            newForm.destination = true;
            setForm(newForm);
            console.log(form.destination);
        }
        else {
            const newForm = { ...form };
            newForm.destination = false;
            setForm(newForm);
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
        if (event.target.name === 'date') {
            const newForm = { ...form };
            newForm.date = event.target.value;
            setForm(newForm);
        }
    }


    return (
        <Container maxWidth="lg">
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper}>
                            {
                                !form.destination &&

                                <FormGroup>
                                    <Input onChange={handleChange} name="from" type="text" placeholder="From"></Input>
                                    <Input onChange={handleChange} name="to" type="text" placeholder="To"></Input>
                                    <Input onChange={handleChange} name="date" type="date" placeholder="Date"></Input>

                                    <Button style={{ fontWeight: 'bold', backgroundColor: '#ff978d96', margin: '5px' }} onClick={showDestination}> Submit </Button>
                                </FormGroup>
                            }
                            {
                                form.destination &&
                                <>
                                    <div style={{ backgroundColor: '#91e6ffc7', padding: '2px', borderRadius: '10px', fontWeight: 'bolder' }}>
                                        <p>From: {form.from}</p>
                                        <p>To: {form.to}</p>
                                        <p>Date: {form.date}</p>
                                    </div>
                                    
                                    <div style={{ margin: '2px', marginTop: '10px' , padding: '15px', backgroundColor: '#91e6ffc7', borderRadius: '10px' }}>
                                        {
                                            form.storeData &&
                                            form.storeData.map(data => <div style={{ display: 'flex', justifyContent: 'space-around', padding: '2%' }}><img style={{ width: '20%', height: '25%', alignSelf: 'center' }} src={person} alt="img" /><p style={{ fontWeight: 'bolder', alignSelf: 'center' }}>4</p><img style={{ width: '50%', margin: '5%' }} src={form.image} alt="img" /> <p style={{ fontWeight: 'bolder', alignSelf: 'center' }}>{data}</p></div>)
                                        }
                                        {
                                            !form.transport && 
                                            <p style={{ fontWeight: 'bolder'}}> Please Select A Transport First ! </p>
                                        }
                                    </div>
                                </>
                            }
                        </Paper>
                        {/* <img src={form.image} alt=""/> */}

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