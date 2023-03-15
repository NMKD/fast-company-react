import React from "react";
import FormUser from "../form/formUser";
import PropTypes from "prop-types";

const Edit = ({
    user,
    onSubmit,
    onChange,
    isLoading,
    radioOptions,
    qualities,
    professions
}) => {
    return (
        <>
            {
                <div className="row mt-5">
                    <div className="col-6 offset-md-3 offset-lg-3 shadow p-5">
                        <FormUser
                            {...{
                                user,
                                onSubmit,
                                onChange,
                                isLoading,
                                radioOptions,
                                qualities,
                                professions
                            }}
                        />
                    </div>
                </div>
            }
        </>
    );
};

Edit.propTypes = {
    user: PropTypes.object,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    isLoading: PropTypes.bool,
    radioOptions: PropTypes.array,
    professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Edit;
