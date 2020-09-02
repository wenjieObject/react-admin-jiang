import React from 'react';

import { Route, Redirect } from 'react-router-dom';

//import {  getToken } from '@/utils/session'
import {  getToken } from '@/utils/cookies'
//console.log(getToken());
const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            getToken()
            ?<Component {...props} /> 
            :<Redirect to='/' />
        )} />
    )
}

export default PrivateRouter;