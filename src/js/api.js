export class Api {
  constructor(options) {
    this.options = options;
    this.getInitialCards = this.getInitialCards.bind(this);
  }

  getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так, ошибка: ${res.status}`);
  }

  async getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    })
      .then(this.getResponse);
  }

  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    })
      .then(this.getResponse);
  }

  changeUserInfo(name, job) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about: job,
      }),
      headers: this.options.headers,
    })
      .then(this.getResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
      headers: this.options.headers,
    })
      .then(this.getResponse);
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(this.getResponse);
  }

  addLike(id) {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: 'PUT',
      headers: this.options.headers,
    })
      .then(this.getResponse);
  }

  removeLike(id) {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: 'DELETE',
      headers: this.options.headers,
    })
      .then(this.getResponse);
  }

  changeAvatar(link) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link,
      }),
      headers: this.options.headers,
    })
      .then(this.getResponse);
  }
}


/*
    Отлично, все замечания исправлены верно

    Если у Вас будет свободное время попробуйте переписать работу с сервером
    применив async/await для работы с асинхронными запросами.
    https://learn.javascript.ru/async-await
    https://habr.com/ru/company/ruvds/blog/414373/
    Это часто используется в реальной работе

    Успехов в дальнейшем обучении!

*/
