import logo from "../images/header/logo.svg";
import openBtn from "../images/menu/open.svg";
import closeBtn from "../images/menu/close.svg"
import {useState} from "react";

function Header(props) {
    const {
        children,
        loggedIn,
        windowWidth,
    } = props;

    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

    const isDropdownActive = loggedIn && windowWidth < 571;

    const containerClassName = isDropdownActive
        ? 'header__menu-dropdown'
        : 'header__menu-container';

    const openBtnStyle = {
        backgroundImage: `url(${openBtn})`,
        width: 24,
        height: 18
    }

    const closeBtnStyle = {
        backgroundImage: `url(${closeBtn})`,
        width: 20,
        height: 20
    }

    function handleMenuButtonClick() {
        setIsDropdownMenuOpen(!isDropdownMenuOpen);
    }

    return (
        <header className='header'>
            <img className="header__logo" src={logo} alt="лого" />
            {isDropdownActive
                && <button
                        className='header__button'
                        style={isDropdownMenuOpen ? closeBtnStyle : openBtnStyle}
                        onClick={handleMenuButtonClick}
                />
            }
            <div
                className={containerClassName}
                style={(!isDropdownMenuOpen && isDropdownActive)
                    ? {display: 'none'}
                    : {display: 'flex'}}
            >
                {children}
            </div>
        </header>
    )
}

export default Header;