// eslint-disable-next-line max-classes-per-file
import { api, cardList } from './index.js';


class Popup {
  constructor(container, popup) {
    this.popup = popup;
    this.container = container;
  }

  createPopup() {
    const popup = document.createElement('div');
    const popupString = this.popup;

    popup.insertAdjacentHTML('beforeend', popupString.trim());
    window.popup = popup;

    return popup.firstChild;
  }

  removePopup() {
    this.container.classList.remove('popup_is-opened');
    this.container.innerHTML = '';
  }

  open() {
    this.container.classList.add('popup_is-opened');
    this.container.appendChild(this.createPopup());
  }

  close(event) {
    if (event.target.classList.contains('popup__close')) {
      this.removePopup();
    }
  }

  startLoading() {
    const button = document.querySelector('.popup__button');
    const loadingText = 'Загрузка...';

    button.textContent = loadingText;
  }

  endLoading(text) {
    const button = document.querySelector('.popup__button');

    button.textContent = text;
    this.removePopup();
  }

  listeners() {
    this.container.addEventListener('click', (event) => {
      this.close(event);
    });
  }
}

class FullImgPopup extends Popup {
  constructor(container, popup, link) {
    super(container, popup);
    this.link = link;
  }

  addLink(link) {
    this.container.querySelector('.full-image-popup__pic').src = link;
  }
}

class AddCardPopup extends Popup {
  constructor(container, popup) {
    super(container, popup);
  }

  chengeFontSize(size) {
    document.querySelector('.popup__button').style.fontSize = `${size}`;
  }

  renderCard(data) {
    const card = {};

    card.name = data.name;
    card.link = data.link;
    card.likes = data.likes.length;
    card._id = data._id;
    card.owner = true;
    card.IsOwnLike = false;

    cardList.addCard(card);
  }

  hideListeners() {
    document.querySelector('.popup__button').addEventListener('click', (event) => {
      event.preventDefault();

      const name = document.forms.new.elements.name.value;
      const link = document.forms.new.elements.link.value;

      this.startLoading();
      this.chengeFontSize('18px');

      api.addNewCard(name, link)
        .then((result) => {
          this.renderCard(result);
        })
        .catch((err) => console.log(`${err}. Карточка не загружена.`))
        .finally(() => {
          this.endLoading('+');
        });
    });
  }
}

class EditProfilePopup extends Popup {
  getCurrentProfile() {
    const form = document.forms.editProfile;
    const enteredName = form.elements.userName;
    const enteredJob = form.elements.userJob;
    const name = document.querySelector('.user-info__name');
    const job = document.querySelector('.user-info__job');

    enteredName.value = name.textContent;
    enteredJob.value = job.textContent;
  }

  editProfile(name, about) {
    const userName = document.querySelector('.user-info__name');
    const job = document.querySelector('.user-info__job');

    userName.textContent = name;
    job.textContent = about;
  }

  hideListeners() {
    document.querySelector('.popup__button').addEventListener('click', () => {
      event.preventDefault();

      const form = document.forms.editProfile;
      const enteredName = form.elements.userName;
      const enteredJob = form.elements.userJob;

      this.startLoading();

      api.changeUserInfo(enteredName.value, enteredJob.value)
        .then((result) => {
          this.editProfile(result.name, result.about);
        })
        .catch((err) => console.log(`${err}. Данные пользователя не изменены.`))
        .finally(() => {
          this.endLoading('Сохранить');
        });
    });
  }
}

class AvatarPopup extends Popup {
  changeAvatar(link) {
    const userImg = document.querySelector('.user-info__photo');
    userImg.style.backgroundImage = `url(${link})`;
  }

  hideListeners() {
    document.querySelector('.popup__button').addEventListener('click', (event) => {
      event.preventDefault();

      const form = document.forms.EditAvatar;
      const input = form.elements.avatar;

      this.startLoading();

      api.changeAvatar(input.value)
        .then((result) => {
          this.changeAvatar(result.avatar);
        })
        .catch((err) => console.log(`${err}. Аватар не изменен.`))
        .finally(() => {
          this.endLoading('Сохранить');
        });
    });
  }
}

export {
  FullImgPopup, AddCardPopup, EditProfilePopup, AvatarPopup,
};
