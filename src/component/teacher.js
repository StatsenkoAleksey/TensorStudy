import  {Person} from './person.js';
/**
 * Класс, описывающий поля, специфические для учителей
 */

export class Teacher extends Person {

  constructor(params) {
    super(params);
    this.type = 'teacher';
  }
  
  get job() {
    return `<p class="mini-card__info-title">Работает</p>
    <p class="mini-card__info-data">${this.params.university} ${this.params.post}</p>`;
  }

  get state() {
    return `${this.params.university} ${this.params.post}`;
  }
}