import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isAuth ? <Component {...routeProps} /> : <Redirect to="/" />
            }
        />
    )
}
