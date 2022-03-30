import {useCallback, useState} from "react";

export function useFormAndValidation() {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    function handleChange(e) {
        const { name, value } = e.target;
        const form = e.target.closest('.form');

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setIsValid(form.checkValidity());
    }

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return {
        values,
        handleChange,
        errors,
        isValid,
        resetForm,
        setValues,
        setIsValid
    }
}