'use strict'

/*
* Рекомендация по внедрению шаблонов вёрстки была
* не проигнорирована, а принята во внимание.
* Реализация была отложена ввиду некоторой "второстепенности".
* Более важным для меня было отладить имеющиеся баги
* и выполнить новое домашнее задание по достаточно объёмной
* и не самой лёгкой теме.
* Спасибо за отзывы и рекомендации!
*/


// Массив с данными для карточек классов Student и Teacher

const studentArr = [
  {
    fullName: 'Вася Иванов',
    university: 'УГАТУ',
    course: 2,
    birthDate: new Date(2000, 1, 1),
    photoUrl: 'img/ava01.jpg'
  },

  {
    fullName: 'Маша Иванова',
    university: 'УГАТУ',
    course: 3,
    birthDate: new Date(1999, 5, 3),
    photoUrl: 'img/ava02.jpg'
  },

  {
    fullName: 'Ира Петрова',
    university: 'УГАТУ',
    course: 1,
    birthDate: new Date(2001, 9, 22),
    photoUrl: 'img/ava03.jpg'
  },

  {
    fullName: 'Петя Сидоров',
    university: 'УГАТУ',
    birthDate: new Date(1999, 10, 10),
    photoUrl: 'img/ava04.jpg',
    post: 'Ассистент'
  },

  {
    fullName: 'Маша Петрова',
    university: 'УГАТУ',
    birthDate: new Date(1998, 7, 14),
    photoUrl: 'img/ava05.jpg',
    post: 'Преподаватель'
  },

  {
    fullName: 'Иван Иванов',
    university: 'УГАТУ',
    birthDate: new Date(1940, 6, 2),
    photoUrl: 'img/ava06.jpg',
    post: 'Профессор'
  }
];

/**
 * Родительский класс для Student и Teacher
 * Код был максимально вынесен в класс Person
 * во избежание копипаста
 */

class Person {

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

  appendToDOM() {
    const layout = this.render();
    document.getElementById('main-content').append(layout);
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

/**
 * Класс, описывающий поля, специфические для обучающихся
 */

class Student extends Person {

  constructor(params) {
    super(params);
    this.course = params.course;
    this.type = 'student';
    this.state = this.course;
    this.job = 'Учится';
    this.jobState = this.course + ' курс';
  }

}

/**
 * Класс, описывающий поля, специфические для учителей
 */

class Teacher extends Person {

  constructor(params) {
    super(params);
    this.post = params.post;
    this.type = 'teacher';
    this.state = this.post;
    this.job = 'Работает';
    this.jobState = this.state;
  }

}

/**
 * Фабрика для создания объектов Student или Teacher
 * в зависимости от имеющихся полей в переданных параметрах
 */

class PersonFactory {
  create(params) {
    if (params.course) {
      return new Student(params);
    } else if (params.post) {
        return new Teacher(params);
    } else {
      return new Person(params);
    }
  }
}

/**
 * Класс - список всех сотрудников и обучающихся школы
 */

class SchoolList {
  constructor() {
    this.list = [];
  }

  /**
   * Метод добавления студента/учителя в список 
   * @param {*} person - объект, созданный фабрикой
   */

  add(person) {
    this.list.push(person);
  }

  /**
   * Метод удаляет студента/учителя из списока
   * @param {*} name - полное имя удаляемого человека
   */
  
  remove(name) {
    this.list.map((item, index) => {
      if (item.fullName === name) {
        this.list.splice(index, 1);
      }
    });
  }

  /**
   * Метод ищет в списке людей с заданным полным именем
   * @param {*} name - полное имя искомого человека
   * @returns - массив с объектами, соответствующими поиску
   */

  find(name) {
    const listOfPerson = [];
    this.list.map((item, index) => {
      if (item.fullName === name) {
        listOfPerson.push(item);
      }
    })
    return listOfPerson;
  }
}

/**
 * Класс, описывающий учебное заведение
 */

class School {
  constructor() {
    this.school = new SchoolList();
    this.personFactory = new PersonFactory();
  }

  /**
   * Метод зачисления сотрудников/студентов в базу
   * @param {*} params - параметры, описывающие зачисляемого
   * @returns - объект, описывающий зачисленного человека
   */

  enroll(params) {
    const person = this.personFactory.create(params);
    this.school.add(person);
    return person;
  }

  /**
   * Метод исключения сотрудников/студентов из базы
   * @param {*} name - полное имя человека
   */

  dismiss(name) {
    this.school.remove(name);
  }

  /**
   * Метод поиска сотрудников/студентов по полному имени
   * @param {*} name - полное имя искомого человека
   * @returns - массив с объектами, соответствующими поиску
   */
  getPerson(name) {
    return this.school.find(name);
  }
}


/**
 * Основная функция выполнения скрипта
 */

function init () {
  const school = new School();
  studentArr.forEach((item) => {
    const person = school.enroll(item);
    person.appendToDOM();    
  })
  school.dismiss('Маша Иванова');
  console.log(school);
  console.log(school.getPerson('Маша Петрова'));
}
