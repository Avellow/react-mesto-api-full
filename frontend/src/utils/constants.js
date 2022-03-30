export const menuLinks = [
    {
        to: '/sign-in',
        text: 'Войти'
    },
    {
        to: '/sign-up',
        text: 'Регистрация'
    }
];

export const errorsInfo = {
    registration: {
        400: 'некорректно заполнено одно из полей'
    },
    authorization: {
        400: 'не передано одно из полей',
        401: 'пользователь с email не найден'
    },
    tokenChecking: {
        400: 'Токен не передан или передан не в том формате',
        401: 'Переданный токен некорректен'
    }
}