import {SchoolList} from './schoolList.js';
import {PersonFactory} from './personFactory.js';

/**
 * Класс, описывающий учебное заведение
 */

export class School {
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

  appendToDOM(elem) {
    const list = this.school.getList;
    list.forEach((item) => {
      item.appendToDOM(elem);
    });
  }
}