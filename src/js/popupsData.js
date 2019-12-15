import closeImage from '../images/close.svg';
(function() {
        const popupsData = {
    addPopup: `
        <div class="popup__content">
        <img src="${ closeImage }" alt="" class="popup__close">
        <h3 class="popup__title">Новое место</h3>
        <form class="popup__form" name="new" novalidate>
            <input class="popup__input popup__input-type-name" placeholder="Название" name="name" required minlength="2" maxlength="30">
            <span class="popup__error-message popup__error-message_first" aria-live="polite">&nbsp;</span>
            <input class="popup__input popup__input_type-link-url" placeholder="Ссылка на картинку" type="url" name="link" required>
            <span class="popup__error-message popup__error-message_second" aria-live="polite">&nbsp;</span>
            <button type="button" class="button popup__button" name = 'createButton' disabled>+</button>
        </form>
        </div>`,
    editPopup: `
        <div class="popup__content">
            <img src="${ closeImage }" alt="" class="popup__close">
            <h3 class="popup__title">Редактировать профиль</h3>
            <form class="popup__form" name="editProfile" novalidate>
                <input type="text" name="userName" class="popup__input popup__input-type-user-name" placeholder="Имя" required minlength="2" maxlength="30">
                <span class="popup__error-message popup__error-message_first" aria-live="polite">&nbsp;</span>
                <input type="text" name="userJob" class="popup__input popup__input-type-user-info" placeholder="О себе" required minlength="2" maxlength="30">
                <span class="popup__error-message popup__error-message_second" aria-live="polite">&nbsp;</span>
                <button type="submit" class="button popup__button popup__button_edit-profile" name='confirmChanges' disabled>Сохранить</button>
            </form>
        </div>`,
    fullImgPopup: `
        <div class="popup__form full-image-popup__content">
            <img src="${ closeImage }" alt="" class="popup__close">
            <img src="" alt="" class="full-image-popup__pic">
        </div>`,
    avatar: `
        <div class="popup__content">
            <img src="${ closeImage }" alt="" class="popup__close">
            <h3 class="popup__title">Изменить автар</h3>
            <form class="popup__form" name="EditAvatar" novalidate>
                <input name="avatar" class="popup__input popup__input-type-avatar" placeholder="Ссылка на автатар" required type="url" required>
                <span class="popup__error-message popup__error-message_first" aria-live="polite">&nbsp;</span>
                <button type="submit" class="button popup__button popup__button_avatar popup__button_edit-profile" name='confirmChanges' disabled>Сохранить</button>
            </form>
        </div>`
}

window.popupsData = popupsData;
})();

