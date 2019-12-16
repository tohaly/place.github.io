import Card from './card';
import { cards } from './index.js';

export default class CardList {
  constructor(container, list) {
    this.container = container;
    this.list = list;
  }

  addCard(data) {
    const { element } = new Card(data);

    cards.push(element);
    this.container.appendChild(element);
  }

  ownerCheck(item) {
    if (item.owner._id !== 'd114045f7fbd300fb5735a4e') {
      return false;
    }
    return true;
  }

  chekLike(item) {
    return item.likes.some((item) => item._id === 'd114045f7fbd300fb5735a4e');
  }


  getCardsFromServer(list) {
    list.forEach((item) => {
      const card = {};

      card.name = item.name;
      card.link = item.link;
      card.likes = item.likes.length;
      card._id = item._id;
      card.owner = this.ownerCheck(item);
      card.IsOwnLike = this.chekLike(item);

      this.addCard(card);
    });
  }
}
