import {Person} from './person.js';
import {Student} from './student.js';
import {Teacher} from './teacher.js';
/**
 * Фабрика для создания объектов Student или Teacher
 * в зависимости от имеющихся полей в переданных параметрах
 */

export class PersonFactory {
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