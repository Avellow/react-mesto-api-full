import PopupWithForm from "./PopupWithForm";
import {useContext} from "react";
import {FormsFetchingContext} from "../contexts/FormsFetchingContext";

function ConfirmPopup(props) {

    const {
        isOpen,
        name,
        onClose,
        onCardDelete,
        card
    } = props;

    const buttonText = useContext(FormsFetchingContext);

    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
            name={name}
            title={'Вы уверены?'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={buttonText.confirmAction}
            onSubmit={handleSubmit}
            isValid={true}
        />
    )
}

export default ConfirmPopup;