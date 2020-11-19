import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
// Components
import Navbar from './layout/Navbar';

// Pages
import cases from './pages/cases';
import landing from './pages/landing';
import login from './pages/Login';
import signup from './pages/signup';
import profile from './pages/profile';

import axios from 'axios';
import theme from './theme';

import { AppContextProvider } from './AppContext';
import { logoutUser, getUserData } from './data/userApi';
import PageLoader from './util/PageLoader';
import ProtectedRoute from './util/ProtectedRoute';

axios.defaults.baseURL =
  // 'https://asia-northeast1-bluetac-pro.cloudfunctions.net/api';
  'http://localhost:5000/bluetac-pro/asia-northeast1/api';

const token = localStorage.FBIdToken;
function Copyright() {
  return (
    <Typography variant="caption" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        BlueTac
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const validateUser = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logoutUser();
        window.location.href = '/login';
      } else if (!user) {
        setLoading(true);
        axios.defaults.headers.common['Authorization'] = token;
        getUserData().then((data) => {
          setUser(data);
          setLoading(false);
        });
      }
    }
  }
  useEffect(() => {
    validateUser();
  }, []);
  if (loading) {
    return <PageLoader />
  }



  return (
    <MuiThemeProvider theme={theme}>
      <AppContextProvider value={{ user, setUser }}>
        <Router>
          <Navbar />
          <div className={classes.root}>
            <div className="container">
              <Switch>
                <ProtectedRoute exact path="/" component={cases} />
                <ProtectedRoute path="/cases" component={cases} />
                <ProtectedRoute exact path="/profile" component={profile} />
                <Route exact path="/" component={landing} />
                <Route exact path="/landing" component={landing} />
                <Route exact path="/login" component={login} />
                <Route path="/signup" component={signup} />
              </Switch>
            </div>
            <footer className={classes.footer}>
              <div className="title-container">
                <Copyright />
              </div>
            </footer>
          </div>
        </Router>
      </AppContextProvider>
    </MuiThemeProvider>
  );

}

export default App;
