import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect} from "react";
import {FormsFetchingContext} from "../contexts/FormsFetchingContext";
import {useFormAndValidation} from "../hooks/useFormAndValidation";
import Input from "./Input";

function AddPlacePopup(props) {

    const {
        isOpen,
        onClose,
        onCardSubmit
    } = props;

    const {
        values,
        handleChange,
        errors,
        isValid,
        resetForm
    } = useFormAndValidation();

    const buttonText = useContext(FormsFetchingContext);

    const PLACE_NAME = 'place-name';
    const PLACE_LINK = 'place-link';

    useEffect(() => {
        resetForm();
    }, [isOpen, resetForm]);

    function handleSubmit(e) {
        e.preventDefault();
        onCardSubmit({ name: values[PLACE_NAME], link: values[PLACE_LINK] });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title={'Новое место'}
            name={'add-place'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={buttonText.addPlace}
            isValid={isValid}
        >
            <Input
                values={values}
                type="text"
                name={PLACE_NAME}
                onChange={handleChange}
                placeHolder="Название"
                required={true}
                errors={errors}
                minLength="2"
                maxLength="30"
            />
            <Input
                values={values}
                type="url"
                name={PLACE_LINK}
                onChange={handleChange}
                placeHolder="Ссылка на картинку"
                required={true}
                errors={errors}
            />
        </PopupWithForm>
    )
}

export default AddPlacePopup;