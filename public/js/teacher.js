import  {Person} from './person.js';
/**
 * Класс, описывающий поля, специфические для учителей
 */

export class Teacher extends Person {

  constructor(params) {
    super(params);
    this.post = params.post;
    this.type = 'teacher';
    this.state = this.post;
    this.job = 'Работает';
    this.jobState = this.state;
  }

}