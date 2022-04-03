import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {

    const {
        card,
        onCardClick,
        onCardLike,
        onCardDelete
    } = props;

    const { _id } = useContext(CurrentUserContext);

    const isOwn = card.owner === _id;
    const isLiked = card.likes.some(i => i === _id);

    const cardLikeButtonClass = (
        `place__like-button ${isLiked
            ? 'place__like-button_active'
            : ''
        }`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleRemoveClick() {
        onCardDelete(card);
    }

    return (
        <li className="place">
            {isOwn && <button
                className='place__remove-button'
                onClick={handleRemoveClick}
            />}
            <img
                className="place__img"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <h2 className="place__name">{card.name}</h2>
            <div className="place__like-section">
                <button
                    className={cardLikeButtonClass}
                    type="button"
                    aria-label="like"
                    onClick={handleLikeClick}
                />
                <p className="place__like-counter">{ card.likes.length }</p>
            </div>
        </li>
    )
}

export default Card;