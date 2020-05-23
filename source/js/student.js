import  {Person} from './person.js';
/**
 * Класс, описывающий поля, специфические для обучающихся
 */

export class Student extends Person {

  constructor(params) {
    super(params);
    this.type = 'student';
  }

  get job() {
    return `<p class="mini-card__info-title">Учится</p>
    <p class="mini-card__info-data">${this.params.university} ${this.params.course}</p>`;
  }

  get state() {
    return `${this.params.university} ${this.params.course}`;
  }
}