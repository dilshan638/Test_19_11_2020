import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, Redirect } from 'react-router-dom';

// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { loginUser, getUserData } from '../data/userApi';
import { useAppContext } from '../AppContext';

//Other stuff
import Page from '../layout/Page';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function Login() {
  const { setUser } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [
    redirectToReferrer,
    setRedirectToReferrer
  ] = useState(false);

  const { state } = useLocation()
  const classes = useStyles();

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const userData = {
      email,
      password
    };

    loginUser(userData).then(
      (data) => {
        getUserData().then((data) => {
          setUser(data);
          setLoading(false);
          setRedirectToReferrer(true)
        });
      }
    ).catch((err) => {
      setLoading(false);
      console.log(err.response.data);
      setErrors({general: err.response.data})
    });
  };
  const handleChange = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  if (redirectToReferrer === true) {
    return <Redirect to={state ? state.from : '/'} />
  }
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">



          <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Sign in
                  </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Sign in on the internal platform
                  </Typography>
            {(errors && errors.general) && (
              <Alert severity="error">{errors.general}</Alert>
            )}
          </Box>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <Button
                color="primary"
                fullWidth
                startIcon={<img src='images/facebook.svg' width='24' alt='f' />}
                size="large"
                variant="contained"
              >
                Login with Facebook
                    </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Button
                fullWidth
                startIcon={<img src='images/google.svg' width='24' alt='f' />}
                size="large"
                variant="contained"
              >
                Login with Google
                    </Button>
            </Grid>
          </Grid>

          <Box
            mt={3}
            mb={1}
          >
            <Typography
              align="center"
              color="textSecondary"
              variant="body1"
            >
              or login with email address
                  </Typography>
          </Box>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors && errors.email}
              error={(errors && errors.email) ? true : false}
              value={email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin='dense'
              autoFocus
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors && errors.password}
              error={(errors && errors.password) ? true : false}
              value={password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin='dense'
            />

            <Box mb={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                Login with email
              {loading && (
                  <CircularProgress size={30} />
                )}
              </Button>
            </Box>
            <small>
              Don't have an account ? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Container>
      </Box>
    </Page>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

export default Login;
