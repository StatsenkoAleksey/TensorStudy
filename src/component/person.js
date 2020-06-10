import { Component } from "./component.js";

/**
 * Родительский класс для Student и Teacher
 * Код был максимально вынесен в класс Person
 * во избежание копипаста
 */

export class Person extends Component {
  constructor(params) {
    super(params);
    this.type = "person";
  }

  get job() {
    return "";
  }

  get state() {
    return "";
  }

  /**
   * Получение даты рождения
   *
   * @returns - Строка формата 'число месяца'.
   */

  get birthDateStr() {
    const birthDate = new Date(this.params.birthDate);
    const monthName = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const dateStr = birthDate.getDate() + " " + monthName[birthDate.getMonth()];
    return dateStr;
  }

  /**
   * Расчёт возраста по дате рождения
   *
   * @returns - Строка формата 'число год/года/лет'.
   * Подстановка слов год/года/лет происходит в зависимости
   * от возраста.
   */

  get age() {
    const today = new Date();
    const birthDate = new Date(this.params.birthDate);
    let studentAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      studentAge--;
    }
    let ageStr = " ";
    if (studentAge < 10 || studentAge > 20) {
      if (studentAge % 10 === 1) {
        ageStr += "год";
      } else if (studentAge % 10 > 1 && studentAge % 10 < 5) {
        ageStr += "года";
      } else {
        ageStr += "лет";
      }
    } else {
      ageStr += "лет";
    }
    return studentAge + ageStr;
  }

  /**
   * Добавление события открытия мини-карточки
   * при клике на основную карточку.
   */

  afterMount() {
    this.container.onclick = (e) => {
      const miniCards = e.currentTarget.getElementsByClassName("mini-card");
      if (miniCards[0].classList.contains("mini-card_hidden")) {
        this.openCard(e.currentTarget);
      }
    };

    const div = this.container.querySelector(".mini-card");
    div.querySelector(".mini-card__close").onclick = (e) => {
      e.stopPropagation();
      div.classList.add("mini-card_hidden");
    };
    div.style.left = 0;
    if (div.getBoundingClientRect().right > document.body.clientWidth - 10) {
      div.style.left =
        document.body.clientWidth -
        div.getBoundingClientRect().right -
        10 +
        "px";
    }
    window.addEventListener("resize", (e) => {
      div.style.left = 0;
      if (div.getBoundingClientRect().right > document.body.clientWidth - 10) {
        div.style.left =
          document.body.clientWidth -
          div.getBoundingClientRect().right -
          10 +
          "px";
      }
    });
  }

  /**
   * Построение карточки
   *
   * @returns {div} - Node элемент, содержащий карточку
   * и шаблон мини-карточки
   */

  render() {
    return `
    <div class="user">
      <img class="user-avatar" src="${this.params.photo}" alt="Аватар пользователя">
      <p class="user-name">${this.params.fullName}</p>
      <span class="user-information">${this.state}</span>
      
      <div class="mini-card  mini-card_hidden">
        <img class="mini-card__close" src="img/icon-off.png" alt="Закрыть">
        <p class="mini-card__user-name">${this.params.fullName}</p>
        <p class="mini-card__info-title">День рождения</p>
        <p class="mini-card__info-data">${this.birthDateStr}</p>
        <p class="mini-card__info-data">${this.age}</p>
        ${this.job}
        <img class="mini-card__avatar" src="${this.params.photo}" alt="Аватар пользователя">
      </div>
      
    </div>
    `;
  }

  /**
   * Открытие мини-карточки.
   * Добавление события закрытия мини-карточки
   * при клике на крестик.
   * Смещение мини-карточки влево, в случае выхода её границы
   * за пределы окна браузера
   *
   * @param {*} currentCard - объект, на котором был произведён
   * клик.
   */

  openCard(currentCard) {
    const miniCards = document.body.getElementsByClassName("mini-card");
    for (let elem of miniCards) {
      if (!elem.classList.contains("mini-card_hidden")) {
        elem.classList.add("mini-card_hidden");
      }
    }

    const div = currentCard.querySelector(".mini-card");
    div.classList.remove("mini-card_hidden");
    div.style.left = 0;
    if (div.getBoundingClientRect().right > document.body.clientWidth - 10) {
      div.style.left =
        document.body.clientWidth -
        div.getBoundingClientRect().right -
        10 +
        "px";
    }
  }
}
