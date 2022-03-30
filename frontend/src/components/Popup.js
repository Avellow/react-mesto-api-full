import {useEffect} from "react";

const Popup = (props) => {
    const {
        isOpen,
        name,
        onCLose,
        children
    } = props;

    useEffect(() => {
        if (!isOpen) return;

        const closeByEsc = (e) => {
            if (e.key === 'Escape') {
                onCLose();
            }
        }

        document.addEventListener('keydown', closeByEsc);
        return () => document.removeEventListener('keydown', closeByEsc);
    }, [isOpen, onCLose]);

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onCLose();
        }
    }

    return (
        <section
            className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_${name}`}
            onClick={handleOverlay}
        >
            <div className='popup__container'>
                { children }
                <button
                    className='popup__close-button'
                    type='button'
                    onClick={onCLose}
                />
            </div>
        </section>
    )
}

export default Popup;