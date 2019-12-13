const popupBlock = document.querySelector('.popup');
const placeList = document.querySelector('.places-list');
const cards = [];
const cardList = new CardList(placeList, cards);


const api = new Api(serverData);

function getUserInfo(result) {
    const name = document.querySelector('.user-info__name');
    const job = document.querySelector('.user-info__job');
    const avatar = document.querySelector('.user-info__photo');
    
    name.textContent = result.name;
    job.textContent = result.about;
    avatar.style.backgroundImage = `url(${result.avatar})`;
}

api.getInitialCards()
    .then(result => {
        cardList.getCardsFromServer(result)
    })
    .catch(err => console.log(`${err}. Возникла проблема с загрузкой карточек с сервера.`));

api.getUserInfo()
    .then(result => {
    getUserInfo(result)
    })
    .catch(err => {
        console.log(`${err}. Проблема в получении данных пользователя.`);
    });

document.addEventListener('click', event => {
    if (event.target.classList.contains('place-card__image')) {
        const popup = new FullImgPopup(popupBlock, window.popupsData.fullImgPopup);
        
        popup.listeners();
        popup.open();
        popup.addLink(event.target.style.backgroundImage.slice(5, -2));
    }
});

document.querySelector('.user-info__button').addEventListener('click', () => {
    const popup = new AddCardPopup(popupBlock, window.popupsData.addPopup);
    
    popup.open();
    popup.listeners();
    popup.hideListeners();

    const valid = new Validation(document.querySelector('.popup__form'));
    valid.render();
});

document.querySelector('.user-info__edit-button').addEventListener('click', () => {
    const popupEdit = new EditProfilePopup(popupBlock, window.popupsData.editPopup);

    popupEdit.open();
    popupEdit.getCurrentProfile();
    popupEdit.listeners();
    popupEdit.hideListeners();

    const valid = new Validation(document.querySelector('.popup__form'));
    valid.render();
});

document.querySelector('.user-info__photo').addEventListener('click', (event) => {
    event.preventDefault();
    const popup = new AvatarPopup(popupBlock, window.popupsData.avatar);

    popup.open();
    popup.listeners();
    popup.hideListeners();

    const valid = new Validation(document.querySelector('.popup__form'));
    valid.render();
});