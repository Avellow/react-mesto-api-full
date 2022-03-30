import Popup from "./Popup";

function ImagePopup(props) {

    const {
        name,
        card,
        isOpen,
        onClose
    } = props;

    return (
        <Popup
            isOpen={isOpen}
            onCLose={onClose}
            name={name}
        >
            <figure className="popup__figure">
                <img
                    className="popup__img"
                    src={card.link}
                    alt={card.name}
                />
                <figcaption className="popup__img-subtitle">{card.name}</figcaption>
            </figure>
        </Popup>
    )

    /*return (
        <div
            ref={popupRef}
            className={`popup img-popup ${isOpen ? 'popup_opened' : ''}`}
            tabIndex="-1"
            onKeyDown={handleEscDown}
        >
            <div className="popup__img-container">
                <figure className="popup__figure">
                    <img
                        className="popup__img"
                        src={card.link}
                        alt={card.name}
                    />
                    <figcaption className="popup__img-subtitle">{card.name}</figcaption>
                </figure>
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="close"
                    onClick={onClose}
                />
            </div>
        </div>
    )*/
}

export default ImagePopup;