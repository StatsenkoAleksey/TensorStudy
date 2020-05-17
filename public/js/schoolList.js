/**
 * Класс - список всех сотрудников и обучающихся школы
 */

export class SchoolList {
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

  get getList() {
    return this.list;
  }
}