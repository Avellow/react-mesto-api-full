import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect} from "react";
import {FormsFetchingContext} from "../contexts/FormsFetchingContext";
import {useFormAndValidation} from "../hooks/useFormAndValidation";
import Input from "./Input";


function EditAvatarPopup(props) {

    const {
        isOpen,
        onClose,
        onUpdateAvatar
    } = props;

    const {
        values,
        handleChange,
        errors,
        isValid,
        resetForm
    } = useFormAndValidation();

    const buttonText = useContext(FormsFetchingContext);

    useEffect(() => {
        resetForm();
    }, [isOpen, resetForm])


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: values.avatar
        })
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title={'Обновить аватар'}
            name={'edit-avatar'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={buttonText.updateAvatar}
            isValid={isValid}
        >
            <Input
                values={values}
                type='url'
                name='avatar'
                onChange={handleChange}
                placeHolder='Ссылка на аватар'
                required={true}
                errors={errors}
            />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;