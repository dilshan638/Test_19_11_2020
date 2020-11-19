import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

// MUI Stuff
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { signupUser } from '../../data/userApi';

// Other stuff
import Page from '../../layout/Page';
import { countries } from "../../util/countries";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function Signup(props) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    showPassword: false,
  });

  const [state, setState] = useState({
    email: '',
    password: '',
    showPassword: false,
    firstName: '',
    lastName: '',
    country: ''
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const classes = useStyles(props);
  const history = useHistory();
  const { pendingEmail } = props;
  // TODO
  // If pending email is not set we have to redirect the user back to the step1
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (state.password === '') {
      newErrors.password = 'Password is empty';
    }
    if (state.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters'
    }
    if (state.firstName === '') {
      newErrors.firstName = 'firstName is empty';
    }
    if (state.lastName === '') {
      newErrors.lastName = 'lastName is empty';
    }
    if (state.country === '') {
      newErrors.country = 'Country is empty'
    }
    if (newErrors.password || newErrors.firstName || newErrors.lastName || newErrors.country) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const newUserData = {
      email: pendingEmail,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
      country: state.country
    };
    signupUser(newUserData)
      .then((res) => {
        history.push('/signup/success');
      })
      .catch((err) => {
        if (err) {
          setErrors({ ...newErrors, newErrors });
          return;
        }
        console.log(err.response);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    if (!pendingEmail) {
      history.push('/signup');
    }
  }, []);


  const handleChangeAge = (event) => {
    setState({ ...state, country: event.target.value })
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
    if (errors) {
      if (event.target.value === '') {
        setErrors({ ...errors, [event.target.name]: `${event.target.name} is empty` });
      } else {
        setErrors({ ...errors, [event.target.name]: null });
      }
    }
  };

  const countriesArray = []

  countries.forEach(res => {
    countriesArray.push(<option value={res.value}>{res.label}</option>)
  })



  return (

    <Page
      className={classes.root}
      title="Signup - Provide your detials"
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
              Sign up
                </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {pendingEmail}
            </Typography>
            {(errors && errors.password) && (
              <Alert severity="error">{errors.password}</Alert>
            )}
            {errors.country && <Alert severity="error">{errors.country}</Alert>}

          </Box>

          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.input}
                  size='small'
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText={errors.firstName}
                  error={errors.firstName}
                  value={state.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.input}
                  size='small'
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  helperText={errors.lastName}
                  error={errors.lastName}
                  value={state.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.input} fullWidth variant="outlined" size='small'>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    type={values.showPassword ? 'text' : 'password'}
                    value={state.password}
                    required id="standard-required"
                    name="password"
                    label="Password"
                    helperText={errors.password}
                    error={errors.password}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.input} variant="outlined" fullWidth size='small'>
                  <InputLabel className={classes.selectLabel}>Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={state.country}
                    native
                    onChange={handleChangeAge}
                  >
                    <option aria-label="None" value="" />
                    {countriesArray}
                  </Select>
                </FormControl>
                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}</Typography>
                )}
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item>
                <Box mt={5}>
                  <Link to='/'>
                    Continue with Google
                  </Link>
                </Box>
              </Grid>
            </Grid>
            <Button
              color='primary'
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={loading}
            >
              <Typography variant="button" color='body1'>
                Create Account
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Typography>
            </Button>
          </form>

          <Box my={6}>
            <Grid container>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Yes! Send me genuinely useful emails every now and then to
                help me get the most out of BlueTac"
                />
              </Grid>
              <Grid item xs={12}>
                <Box mt={3} className={classes.flexBox}>
                  <Checkbox className={classes.checkbox} value="allowExtraEmails" color="primary" />
                  <Typography variant='caption'>
                    Yes, I understand and agree to the <Link>BlueTac Terms of Service</Link>,
                    including the <Link>User Agreement</Link> and <Link>Privacy Policy</Link>.
                  </Typography>
                </Box>
              </Grid>

            </Grid>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
Signup.prototype = {
  pendingEmail: PropTypes.string.isRequired,
}
export default Signup;
