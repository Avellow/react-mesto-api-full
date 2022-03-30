import {NavLink} from "react-router-dom";

function NavBar(props) {
    const {
        loggedIn,
        links,
        onExit
    } = props;

    function handleExitProfile() {
        onExit();
    }

    function generateLinks() {
        if (loggedIn) {
            return (
                <NavLink
                    to='/sign-in'
                    className='menu__link'
                    activeStyle={{display: 'none'}}
                    onClick={handleExitProfile}
                    style={{color: '#a9a9a9', fontSize: 18}}
                >
                    Выйти
                </NavLink>
            )
        } else {
            return links.map(({to, text}, i) => (
                <NavLink
                    to={to}
                    className='menu__link'
                    activeStyle={{display: 'none'}}
                    key={i}
                >
                    {text}
                </NavLink>
            ))
        }
    }

    return (
        <nav className='menu'>
            {generateLinks()}
        </nav>
    )
}

export default NavBar;