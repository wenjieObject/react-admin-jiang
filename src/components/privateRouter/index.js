import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import {  getToken } from '@/utils/session'

console.log(getToken()!==null);
const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            getToken()!==null
            ?<Component {...props} /> 
            :<Redirect to='/' />
        )} />
    )
}

export default PrivateRouter;