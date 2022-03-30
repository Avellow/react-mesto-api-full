import successLogo from './../images/sign-up-status/icon_success.png';
import failedLogo from './../images/sign-up-status/icon_failed.png';
import Popup from "./Popup";

function InfoTooltip(props) {

    const {
        isOpen,
        name,
        success,
        onClose
    } = props;

    const text = success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
    const icon = success ? successLogo : failedLogo;

    return (
        <Popup
            isOpen={isOpen}
            onCLose={onClose}
            name={name}
        >
            <div className='sign-up-status'>
                <div className='sign-up-status__icon' style={{backgroundImage: `url(${icon})`}}/>
                <p className='sign-up-status__subtitle'>{text}</p>
            </div>
        </Popup>
    )
}

export default InfoTooltip;