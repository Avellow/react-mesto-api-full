import {createContext} from "react";

export const FormsFetchingContext = createContext();

export const formsButtonTexts = {
    defaultText: {
        addPlace: 'Добавить',
        editProfile: 'Изменить',
        updateAvatar: 'Обновить',
        confirmAction: 'Подтвердить'
    },
    fetchingText: {
        addPlace: 'Сохранение...',
        editProfile: 'Сохранение...',
        updateAvatar: 'Сохранение...',
        confirmAction: 'Удаление...'
    },
}