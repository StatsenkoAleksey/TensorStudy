import  {Person} from './person.js';
/**
 * Класс, описывающий поля, специфические для обучающихся
 */

export class Student extends Person {

 constructor(params) {
   super(params);
   this.course = params.course;
   this.type = 'student';
   this.state = this.course;
   this.job = 'Учится';
   this.jobState = this.course + ' курс';
 }

}