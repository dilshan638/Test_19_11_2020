import React, { useState } from 'react'
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Step1 from './SignupStep1';
import Step2 from './SignupStep2';
import Success from './SignupStep3'
import makeStyles from "@material-ui/core/styles/makeStyles";


function Singup() {
    const { url, path } = useRouteMatch();
    const [pendingEmail, setPendingEmail] = useState('');
    return (
        <>
            <Switch>
                <Route exact path={path} render={(localProps) => {
                    return <Step1 setPendingEmail={setPendingEmail} {...localProps} />
                }} />
                <Route exact path={`${path}/step1`} render={(localProps) => {
                    return <Step1 setPendingEmail={setPendingEmail} {...localProps} />
                }} />
                <Route exact path={`${path}/step2`} render={(localProps) => {
                    return <Step2 pendingEmail={pendingEmail} {...localProps} />
                }} />
                <Route exact path={`${path}/success`} render={(localProps) => {
                    return <Success pendingEmail={pendingEmail} {...localProps} />
                }} />



            </Switch>
        </>
    )
}


export default Singup

