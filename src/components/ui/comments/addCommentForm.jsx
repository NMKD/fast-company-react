import React from "react";
import PropTypes from "prop-types";
import FormComment from "../form/formComment";
import TextAreaField from "../form/fields/textAreaField";

const AddCommentForm = ({ onSubmit }) => {
    return (
        <FormComment onSubmit={onSubmit}>
            <TextAreaField name="content" label="Сообщение" />
            <button type="submit" className="btn btn-primary w-100 mx-auto">
                Отправить
            </button>
        </FormComment>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddCommentForm;
