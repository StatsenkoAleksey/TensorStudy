/**
 * Родительский класс для Student и Teacher
 * Код был максимально вынесен в класс Person
 * во избежание копипаста
 */

export class Person {

  constructor(params) {
    this.fullName = params.fullName;
    this.university = params.university;
    this.birthDate = params.birthDate;
    this.photoUrl = params.photoUrl;
    this.isMiniCardOpen = false;
    this.type = 'person';
    this.state = '';
    this.job ='';
    this.jobState = '';
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
    const dateStr = this.birthDate.getDate() + ' ' +
                  monthName[this.birthDate.getMonth()];
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
    let studentAge = today.getFullYear() - this.birthDate.getFullYear();
    const m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
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
   * Добавление сгенерированной карточки в DOM.
   * Добавление события открытия мини-карточки
   * при клике на основную карточку.
   */

  appendToDOM(elem) {
    const layout = this.render();
    elem.append(layout);
    layout.onclick = (e) => {
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
    const div = document.createElement('div');
    div.className = 'user';
    const txt = `
    <img class="user-avatar" src="${this.photoUrl}" alt="Аватар пользователя">
    <p class="user-name">${this.fullName}</p>
    <span class="user-information">${this.university} ${this.state}</span>
    <template class="tmpl">
      <div class="mini-card">
        <img class="mini-card__close" src="img/icon-off.png" alt="Закрыть">
        <p class="mini-card__user-name">${this.fullName}</p>
        <p class="mini-card__info-title">День рождения</p>
        <p class="mini-card__info-data">${this.birthDateStr}</p>
        <p class="mini-card__info-data">${this.age}</p>
        <p class="mini-card__info-title">${this.job}</p>
        <p class="mini-card__info-data">${this.university} ${this.jobState}</p>
        <img class="mini-card__avatar" src="${this.photoUrl}" alt="Аватар пользователя">
      </div>
    </template>
    `;
    div.innerHTML = txt;
    return div;
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