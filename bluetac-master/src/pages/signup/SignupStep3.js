import React, {useEffect} from 'react';
import {  Box, Button, Container, Grid, makeStyles, TextField, Typography, withStyles } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {Link, useHistory} from 'react-router-dom';

// Icon
import iconOne from '../../assets/svgs/iconOne.svg'


const useStyles = makeStyles((theme) => ({
    main: {
        margin: 'auto',
        paddingBottom: theme.spacing(8),
    },
    accordionText: {
        width: '100%',
        textAlign: 'center',
    },
    gridItem: {
        margin: '30px auto'
    },
    input: {
        backgroundColor: 'white',
    },
    button: {
        padding: '8px 16px',
        marginTop: '6px',
    }
}));


const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        marginBottom: 10,
        minHeight: 5,
        '&$expanded': {
            minHeight: 5,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

const SignUpVerify = ({pendingEmail})=>{
    const classes = useStyles();
    const history = useHistory();
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        if(!pendingEmail){
            history.push('/signup');
        }
    }, []);

    return (
        <Container component="main" maxWidth="sm" className={classes.main}>

            <Box my={3} textAlign='center' >
                <img alt="Icon" src={iconOne} height={70}/>
            </Box>

            <Box my={3} textAlign='center' >
                <Typography variant='h5' gutterBottom>Verify your email to proceed</Typography>
                <Typography variant='body2'>
                    We just sent an email to the address: {pendingEmail}
                    <div>Please check your email and click on the link provided to verify your address. </div>
                </Typography>
            </Box>

            <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography className={classes.accordionText} color='primary'>Change email</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <Grid container alignItems='center' spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className={classes.input}
                                size='small'
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus/>
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <Button
                                component={Link}
                                to='/signUpVerify'
                                disableElevation
                                color='primary'
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.button}
                            >
                                <Typography  variant="button" color='body1'>
                                    Update  & Resend
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>

                </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography className={classes.accordionText} color='primary'>I need help verifying my email</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='subtitle2' align='center'>
                        <b>   Why do we ask for email confirmation?</b>
                        <Box my={3}>
                            Email confirmation is an important security check that helps prevent other people from signing up for an BlueTac account using your email address.
                        </Box>
                        <b>How do I confirm my email address?</b>
                        <Box my={3}>
                            We sent you an email with a link to click on. If you aren't able to click the link, copy the full URL from the email and paste it into a new web browser window.
                        </Box>
                        <b>If you haven't received the confirmation email, please:</b>
                        <Box my={3}>
                            Check the junk mail folder or spam filter in your email account.
                            Make sure your email address is entered correctly.
                        </Box>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Grid container>
                <Grid item xs={12} sm={8} className={classes.gridItem}>
                    <Button
                        component={Link}
                        to='/signUpHire'
                        disableElevation
                        color='primary'
                        type="submit"
                        fullWidth
                        variant="contained">
                        <Typography  variant="button" color='body1'>
                            Resend Verification Email
                        </Typography>
                    </Button>
                </Grid>
            </Grid>

        </Container>
    );
}

export default SignUpVerify;