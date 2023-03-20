/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import TextField from "./fields/textField";
import PropTypes from "prop-types";
import SelectField from "./fields/selectField";
import MultiSelectField from "./fields/multiSelectField";
import RadioField from "./fields/radioField";
import { toFilterQualities } from "../../../utils/getFilterData";
import { validationSchema } from "../../../utils/validationSchema";
import { validate } from "../../../utils/validate";

const FormUser = ({
    user,
    onSubmit,
    onChange,
    radioOptions,
    qualities,
    professions
}) => {
    const defaultValue = toFilterQualities(qualities, user.qualities);

    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length !== 0;

    const { email, name } = user;
    const data = { email, name };
    useEffect(() => {
        const errors = validate(data, validationSchema);
        setErrors(errors);
    }, []);

    return (
        <>
            {user ? (
                <form className="needs-validation" onSubmit={onSubmit}>
                    <TextField
                        name="name"
                        value={user.name}
                        label="Имя"
                        onChange={onChange}
                        // error={errors.name}
                    />
                    <TextField
                        label="Почта"
                        name="email"
                        value={user.email}
                        onChange={onChange}
                        // error={errors.email}
                    />
                    <SelectField
                        label="Выбрать профессию:"
                        defaulOption="Choose..."
                        options={professions}
                        onChange={onChange}
                        name="profession"
                        value={user.profession}
                        // error={errors.profession}
                    />
                    <RadioField
                        label="Выбрать пол: "
                        options={radioOptions}
                        name="sex"
                        value={user.sex}
                        onChange={onChange}
                    />
                    <MultiSelectField
                        label="Выбрать качества:"
                        options={qualities}
                        name="qualities"
                        onChange={onChange}
                        defaultValue={defaultValue}
                    />
                    <button
                        className="btn btn-success mt-3 mb-3"
                        type="submit"
                        disabled={isValid}
                    >
                        Отправить
                    </button>
                </form>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

FormUser.propTypes = {
    user: PropTypes.object,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    radioOptions: PropTypes.array,
    professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default FormUser;
