import { api } from './index';

export default class Card {
    constructor(item) {
        this.element = this.create(item);
        this.listeners();
    }

    create(item) {
        const element = document.createElement('div');
        const cradString = `
            <div class="place-card" id = ${item._id}>
                <div class="place-card__image">
                    <button class="place-card__delete-icon"></button>
                </div>
                <div class="place-card__description">
                    <h3 class="place-card__name"></h3>
                    <div class="place-card__likes">
                        <button class="place-card__like-icon"></button>
                        <p class="place-card__likes-numb">0</p>
                        <div class="place-card__spinner"></div>
                    </div>
                </div>
            </div>`;

        element.insertAdjacentHTML('beforeend', cradString.trim());
        element.querySelector('.place-card__name').textContent = item.name;
        element.querySelector('.place-card__image').style.backgroundImage = `url(${item.link})`;
        element.querySelector('.place-card__likes-numb').textContent = item.likes;

        this.renderDelButtob(item.owner, element);
        this.renderIsLiked(item.IsOwnLike, element);

        return element.firstChild;
    }

    renderIsLiked(isLikes, element) {
        if (isLikes) {
            element.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
        }
    }

    renderDelButtob(isOwn, element) {
        if (!isOwn) {
            element.querySelector('.place-card__image').removeChild(element.querySelector('.place-card__delete-icon'));
        }
    }

    renderNumbLikes(event, numb) {
        document.getElementById(`${event.path[3].id}`).querySelector('.place-card__likes-numb').textContent = numb;
        document.querySelector('.place-card__spinner').classList.remove('place-card__spinner_visible');
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    renderErrLike(id) {
        document.getElementById(`${id}`).querySelector('.place-card__likes-numb').textContent = '❌';
    }

    renderLoadingStart() {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.path[1].querySelector('.place-card__spinner').classList.add('place-card__spinner_visible');
            event.path[1].querySelector('.place-card__likes-numb').textContent = '';
        }
    }

    renderLoadingEnd(event) {
        event.path[1].querySelector('.place-card__spinner').classList.remove('place-card__spinner_visible');
    }

    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            this.renderLoadingStart(true);
            if (event.target.classList.contains('place-card__like-icon_liked')) {
                api.removeLike(event.path[3].id)
                    .then((result) => {
                        this.renderNumbLikes(event, result.likes.length);
                    })
                    .catch((err) => {
                        this.renderErrLike(event.path[3].id);
                        this.renderLoadingEnd(event);
                        console.log(err);
                    })
                    .finally(() => {
                        this.renderLoadingEnd(event);
                    });
            } else {
                api.addLike(event.path[3].id)
                    .then((result) => {
                        this.renderNumbLikes(event, result.likes.length);
                    })
                    .catch(() => {
                        this.renderLoadingEnd(event);
                        this.renderErrLike(event.path[3].id);
                    })
                    .finally(() => {
                        this.renderLoadingEnd(event);
                    });
            }
        }
    }

    removeCard(event) {
        const card = event.target.closest('.place-card');
        card.parentNode.removeChild(card);
    }

    rednderRemoveCard(event) {
        if (event.target.classList.contains('place-card__delete-icon') && window.confirm('Вы действительно хотите удалить публикацию?')) {
            api.deleteCard(event.path[2].id)
                .then(() => this.removeCard(event))
                .catch((err) => console.log(err));
        }
    }

    listeners() {
        this.element.addEventListener('click', (event) => {
            this.like(event);
        });
        this.element.addEventListener('click', (event) => {
            this.rednderRemoveCard(event);
        });
    }
}
