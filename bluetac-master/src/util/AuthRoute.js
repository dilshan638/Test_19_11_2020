import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useAppContext } from '../AppContext';

const AuthRoute = (props) => {
  const { user } = useAppContext();

  const { component: Component, authenticated, ...rest } = props;
  return(<Route
    {...rest}
    render={(props) =>
      user ? <Redirect to="/" /> : <Component {...props} />
    }
  />)};


export default AuthRoute;
