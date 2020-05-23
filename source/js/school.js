import {PersonFactory} from './personFactory.js';
import {Component} from './component.js';

/**
 * Класс, описывающий учебное заведение
 */

export class School extends Component {
  constructor(params) {
    super(params);
    this.schoolList = [];
    this.personFactory = new PersonFactory();
  }

  /**
   * Метод зачисления сотрудников/студентов в базу
   * @param {*} params - параметры, описывающие зачисляемого
   * @returns - объект, описывающий зачисленного человека
   */

  enroll(params) {
    const person = this.personFactory.create(params);
    this.schoolList.push(person);
    return person;
  }

  /**
   * Метод исключения сотрудников/студентов из базы
   * @param {*} name - полное имя человека
   */

  dismiss(name) {
    this.schoolList.map((item, index) => {
      if (item.fullName === name) {
        this.schoolList.splice(index, 1);
      }
    });
  }

  /**
   * Метод поиска сотрудников/студентов по полному имени
   * @param {*} name - полное имя искомого человека
   * @returns - массив с объектами, соответствующими поиску
   */
  getPerson(name) {
    const listOfPerson = [];
    this.schoolList.map((item, index) => {
      if (item.fullName === name) {
        listOfPerson.push(item);
      }
    })
    return listOfPerson;
  }

  mount() {
    this.beforeMount();

    this.schoolList.forEach((item) => {
      item.mount(document.getElementById('main-content'));
    });

    this.afterMount();
  }
}