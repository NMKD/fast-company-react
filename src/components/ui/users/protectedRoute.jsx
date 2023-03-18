import React from "react";
import { Route } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const { stateUserCurrent } = useAuthContext();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (stateUserCurrent === null) {
                    return <Redirect to="/login" />;
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
