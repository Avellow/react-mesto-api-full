import React, {useCallback, useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {FormsFetchingContext, formsButtonTexts} from "../contexts/FormsFetchingContext";
import ConfirmPopup from "./ConfirmPopup";
import {Switch, Route, useHistory} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from './../utils/auth';
import NavBar from "./NavBar";
import {menuLinks, errorsInfo} from "../utils/constants";

function App() {

    const [isOpenedAddPlacePopup, setIsOpenedAddPlacePopup] = useState(false);
    const [isOpenedEditProfilePopup, setIsOpenedEditProfilePopup] = useState(false);
    const [isOpenedEditAvatarPopup, setIsOpenedEditAvatarPopup] = useState(false);
    const [isOpenedConfirmPopup, setIsOpenedConfirmPopup] = useState(false);
    const [isOpenedImagePopup, setIsOpenedImagePopup] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth);

    const history = useHistory();

    const buttonFormText = isFetching ? 'fetchingText' : 'defaultText';
    const { _id: userId } = currentUser;

    // при проверке токена меняю состояние запроса isFetching и вешаю зависимость на отображение компонента Login
    // чтобы не было "моргания" между компонентами Login и Main, если авторизация по токену успешна
    const handleTokenCheck = useCallback(() => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            setIsFetching(true);
            auth.checkToken(jwt)
                .then((user) => {
                    setCurrentUser(prevUserInfo => ({...prevUserInfo, ...user}));
                    setLoggedIn(true);
                    history.push('/');
                })
                .catch(err => console.log(`Ошибка ${err} - ${errorsInfo.tokenChecking[err]}`))
                .finally(() => setIsFetching(false));
        }
    }, [history]);

    useEffect(() => {
        handleTokenCheck();
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([user, cards]) => {
                    setCurrentUser(prevUserInfo => ({...prevUserInfo, ...user}));
                    setCards(cards.reverse());
                })
                .catch(err => console.log(`${err} не удалось получить данные с сервера`));
        }
    }, [loggedIn, handleTokenCheck]);

    useEffect(() => {

        function handleResize() {
            setCurrentWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, [currentWindowWidth])

    //хендлеры для карточки
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === userId);
        api.changeLikeCardStatus(card._id, isLiked)
            .then(newCard => {
                setCards(prevState => prevState.map(c => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(`Ошибка ${err}, не удалось взаимодействовать с лайком`));
    }

    function handleDeleteCard(card) {
        setIsFetching(true);
        api.deleteCard(card._id)
            .then(() => {
                setCards(prevState => prevState.filter(c => c._id !== card._id));
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка ${err}, не удалось удалить карточку`))
            .finally(() => setIsFetching(false));
    }

    function handleCardImageClick(card) {
        setIsOpenedImagePopup(true);
        setSelectedCard(card);
    }

    function handleRemoveCardClick(card) {
        setIsOpenedConfirmPopup(true);
        setSelectedCard(card);
    }

    //хендлеры редактирования профиля и добавления карточек
    function handleUpdateUser(user) {
        setIsFetching(true);
        api.postUserInfo(user)
            .then(userData => {
                setCurrentUser(prevUserInfo => ({...prevUserInfo, ...userData}));
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка ${err}, не удалось обновить профиль`))
            .finally(() => setIsFetching(false));
    }

    function handleUpdateAvatar({ avatar }) {
        setIsFetching(true);
        api.updateAvatar(avatar)
            .then(userData => {
                setCurrentUser(prevUserInfo => ({...prevUserInfo, ...userData}));
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка ${err}, не удалось обновить аватар`))
            .finally(() => setIsFetching(false));
    }

    function handleAddPlaceSubmit(card) {
        setIsFetching(true);
        api.postNewCard(card)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка ${err}, не удалось добавить карточку`))
            .finally(() => setIsFetching(false));
    }

    function handleEditAvatarClick() {
        setIsOpenedEditAvatarPopup(true);
    }

    function handleEditProfileClick() {
        setIsOpenedEditProfilePopup(true);
    }

    function handleAddPlaceClick() {
        setIsOpenedAddPlacePopup(true);
    }

    function closeAllPopups() {
        setIsOpenedAddPlacePopup(false);
        setIsOpenedEditProfilePopup(false);
        setIsOpenedEditAvatarPopup(false);
        setIsOpenedConfirmPopup(false);
        setIsOpenedImagePopup(false);
        setIsTooltipOpen(false);
        setSelectedCard({});
    }

    //хендлеры аутентификации
    function onRegister(email, password) {
        auth.register(email, password)
            .then(() => {
                setRegistrationSuccess(true);
            })
            .catch(err => {
                console.log(`Ошибка ${err} - ${errorsInfo.registration[err]}`);
                setRegistrationSuccess(false);
            })
            .finally(() => setIsTooltipOpen(true))
    }

    function onLogin(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    api.setToken(`Bearer ${data.token}`);
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch(err => console.log(`Ошибка ${err} - ${errorsInfo.authorization[err]}`));
    }

    function onSignOut() {
        if (loggedIn) {
            setLoggedIn(false);
            localStorage.removeItem('jwt');
        }
    }

    return (
        <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                <Header loggedIn={loggedIn} windowWidth={currentWindowWidth}>
                    { loggedIn && <p className='menu__email'>{currentUser.email}</p> }
                    <NavBar
                        loggedIn={loggedIn}
                        links={menuLinks}
                        onExit={onSignOut}
                    />
                </Header>
                <Switch>
                    <Route path="/sign-in">
                        { !isFetching && <Login onSubmit={onLogin} /> }
                    </Route>
                    <Route path="/sign-up">
                        <Register onSubmit={onRegister} />
                    </Route>
                    <ProtectedRoute
                        exact path='/'
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        cards={cards}
                        onCardClick={handleCardImageClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleRemoveCardClick}
                    />
                </Switch>

                <Footer/>
                <FormsFetchingContext.Provider value={formsButtonTexts[buttonFormText]}>
                    <EditProfilePopup
                        isOpen={isOpenedEditProfilePopup}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <EditAvatarPopup
                        isOpen={isOpenedEditAvatarPopup}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                        isOpen={isOpenedAddPlacePopup}
                        onClose={closeAllPopups}
                        onCardSubmit={handleAddPlaceSubmit}
                    />
                    <ConfirmPopup
                        isOpen={isOpenedConfirmPopup}
                        onClose={closeAllPopups}
                        onCardDelete={handleDeleteCard}
                        card={selectedCard}
                        name='confirm'
                    />
                </FormsFetchingContext.Provider>

                <ImagePopup
                    card={selectedCard}
                    isOpen={isOpenedImagePopup}
                    onClose={closeAllPopups}
                    name='image'
                />

                <InfoTooltip
                    isOpen={isTooltipOpen}
                    name='tooltip'
                    onClose={closeAllPopups}
                    success={registrationSuccess}
                />
            </CurrentUserContext.Provider>

        </div>
    );
}

export default App;