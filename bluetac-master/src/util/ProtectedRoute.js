import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../AppContext';

function ProtectedRoute({ children, ...rest }) {
  const { user } = useAppContext();

  return (
    <Route {...rest} render={({ location }) => {
      return user
        ? children
        : <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }}
        />
    }} />
  )
}

export default ProtectedRoute;
