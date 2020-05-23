import {Component} from './component.js';

/**
 * Родительский класс для Student и Teacher
 * Код был максимально вынесен в класс Person
 * во избежание копипаста
 */

export class Person extends Component {

  constructor(params) {
    super(params);
    this.isMiniCardOpen = false;
    this.type = 'person';
  }

  get job() {
    return '';
  }

  get state() {
    return '';
  }

  /**
   * Получение даты рождения
   * 
   * @returns - Строка формата 'число месяца'.
   */

  get birthDateStr() {
    const monthName = ['января', 'февраля', 'марта', 
                      'апреля', 'мая', 'июня', 'июля', 
                      'августа', 'сентября', 'октября', 
                      'ноября', 'декабря'];
    const dateStr = this.params.birthDate.getDate() + ' ' +
                  monthName[this.params.birthDate.getMonth()];
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
    let studentAge = today.getFullYear() - this.params.birthDate.getFullYear();
    const m = today.getMonth() - this.params.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.params.birthDate.getDate())) {
      studentAge--;
    }
    let ageStr = ' ';
    if (studentAge < 10 || studentAge > 20) {
      if (studentAge % 10 === 1) {
        ageStr += 'год';
      } else if (studentAge % 10 > 1 && studentAge % 10 < 5) {
        ageStr += 'года';
      } else {
        ageStr += 'лет';
      }
    } else {
      ageStr += 'лет';
    }
    return studentAge + ageStr;
  }

  /**
   * Добавление события открытия мини-карточки
   * при клике на основную карточку.
   */

  afterMount() {
    this.container.onclick = (e) => {
      if (!this.isMiniCardOpen) {
        this.openCard(e.currentTarget);
      }
    };
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
      <img class="user-avatar" src="${this.params.photoUrl}" alt="Аватар пользователя">
      <p class="user-name">${this.params.fullName}</p>
      <span class="user-information">${this.state}</span>
      <template class="tmpl">
        <div class="mini-card">
          <img class="mini-card__close" src="img/icon-off.png" alt="Закрыть">
          <p class="mini-card__user-name">${this.params.fullName}</p>
          <p class="mini-card__info-title">День рождения</p>
          <p class="mini-card__info-data">${this.birthDateStr}</p>
          <p class="mini-card__info-data">${this.age}</p>
          ${this.job}
          <img class="mini-card__avatar" src="${this.params.photoUrl}" alt="Аватар пользователя">
        </div>
      </template>
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
    const templateCard = currentCard.querySelector('.tmpl').content.cloneNode(true);
    currentCard.appendChild(templateCard);


    this.isMiniCardOpen = true;

    const div = currentCard.querySelector('.mini-card');
    currentCard.querySelector('.mini-card__close').onclick = (e) => {
      e.stopPropagation()
      div.remove();
      this.isMiniCardOpen = false;
    };    
    div.style.left = 0;
    if (div.getBoundingClientRect().right > document.body.clientWidth - 10) {
      div.style.left = document.body.clientWidth - div.getBoundingClientRect().right - 10 + 'px';
    }
    window.addEventListener("resize", (e) => {
      div.style.left = 0;
      if (div.getBoundingClientRect().right > document.body.clientWidth -10) {
        div.style.left = document.body.clientWidth - div.getBoundingClientRect().right - 10 + 'px';
      }
    });
  }

}