import React from "react";
import { Link } from "react-router-dom";
const Links = () => {
    return (
        <>
            <li className="nav-item m-2">
                <Link className="nav-link" to="/">
                    Main
                </Link>
            </li>
            <li className="nav-item m-2">
                <Link className="nav-link" to="/login/singin">
                    Sign In
                </Link>
            </li>
            <li className="nav-item m-2">
                <Link className="nav-link" to="/users">
                    Users
                </Link>
            </li>
        </>
    );
};

export default Links;
