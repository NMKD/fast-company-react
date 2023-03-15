import React from "react";
import PropTypes from "prop-types";
import FormComment from "../form/formComment";
import SelectField from "../form/fields/selectField";
import TextAreaField from "../form/fields/textAreaField";

const AddCommentForm = ({ onSubmit, users }) => {
    return (
        <FormComment onSubmit={onSubmit}>
            <SelectField
                label="Выбрать пользователя:"
                defaulOption="Choose..."
                options={users}
                name="name"
            />
            <TextAreaField name="content" label="Сообщение" />
            <button type="submit" className="btn btn-primary w-100 mx-auto">
                Обновить
            </button>
        </FormComment>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func,
    users: PropTypes.array
};
export default AddCommentForm;
