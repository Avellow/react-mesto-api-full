import Popup from "./Popup";
import Form from "./Form";

function PopupWithForm(prop) {

    const {
        isOpen,
        onClose,
        name,
        onSubmit,
        title,
        children,
        isValid,
        buttonText
    } = prop;

    return (
        <Popup
            isOpen={isOpen}
            onCLose={onClose}
            name={name}
        >
            <Form
                onSubmit={onSubmit}
                name={name}
                isValid={isValid}
                buttonText={buttonText}
                title={title}
            >
                { children }
            </Form>
        </Popup>
    )
}

export default PopupWithForm;