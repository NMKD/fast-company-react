import { useState } from "react";
const useForm = (initialData = {}, onSubmit) => {
    const [form, setForm] = useState(initialData);

    const handeleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };
    const handleChange = (target) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return { handeleSubmit, handleChange, form };
};

export default useForm;
