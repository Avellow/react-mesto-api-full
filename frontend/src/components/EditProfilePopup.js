import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {FormsFetchingContext} from "../contexts/FormsFetchingContext";
import {useFormAndValidation} from "../hooks/useFormAndValidation";
import Input from "./Input";

function EditProfilePopup(props) {

    const {
        isOpen,
        onClose,
        onUpdateUser
    } = props;

    const {
        values,
        handleChange,
        errors,
        isValid,
        resetForm
    } = useFormAndValidation();

    const currentUser = useContext(CurrentUserContext);
    const buttonText = useContext(FormsFetchingContext);

    useEffect(() => {
        resetForm({ username: currentUser.name, job: currentUser.about }, {}, true);
    }, [currentUser, isOpen, resetForm]);


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: values.username,
            about: values.job
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title={'Редактировать профиль'}
            name={'edit-profile'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={buttonText.editProfile}
            isValid={isValid}
        >
            <Input
                values={values}
                type='text'
                name='username'
                onChange={handleChange}
                placeHolder='Имя'
                required={true}
                errors={errors}
                minLength="2"
                maxLength="40"
            />
            <Input
                values={values}
                type='text'
                name='job'
                onChange={handleChange}
                placeHolder='О себе'
                required={true}
                errors={errors}
                minLength="2"
                maxLength="200"
            />
        </PopupWithForm>
    )
}

export default EditProfilePopup;