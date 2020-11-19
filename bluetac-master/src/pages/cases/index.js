import React from 'react'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import List from './List';
import Add from './Add';

function Cases() {
    const { url, path } = useRouteMatch();
    return (
        <>  
            <Switch>
                <Route exact path={path}>
                    <List />
                </Route>
                <Route exact path={`${path}/list`}>
                    <List />
                </Route>
                <Route exact path={`${path}/add`}>
                    <Add />
                </Route>
                <Redirect from={path} to={`${path}/list`} />
            </Switch>
        </>
    )
}

Cases.propTypes = {

}

export default Cases

