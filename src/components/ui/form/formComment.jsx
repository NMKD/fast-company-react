/* eslint-disable no-unneeded-ternary */
import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { validationSchema } from "../../../utils/validationSchema";
import { validate } from "../../../utils/validate";

const FormComment = ({ children, onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = useCallback((target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({});
        setErrors({});
        onSubmit(data);
    };

    useEffect(() => {
        if (data === null || Object.keys(data).length === 0) return;
        setErrors(validate(data, validationSchema));
    }, [data]);

    const isValid = Object.keys(errors).length !== 0;

    const clonedElements = React.Children.map(children, (child) => {
        const typeChild = typeof child.type;
        let config = {};
        if (typeChild === "function" || typeChild === "object") {
            if (!child.props.name) {
                throw new Error(
                    "Property is required for field of components",
                    { child }
                );
            }
            config = {
                ...child.props,
                onChange: handleChange,
                value: data[child.props.name] || "",
                error: errors[child.props.name] || ""
            };
        }
        if (typeChild === "string") {
            if (
                (child.type === "button" && child.props.type === "submit") ||
                (child.type === "button" && child.props.type === undefined)
            ) {
                config = { ...child.props, disabled: isValid };
            }
        }
        return React.cloneElement(child, config);
    });

    return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};

FormComment.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onSubmit: PropTypes.func
};
export default FormComment;
