'use strict'

import {Student, Teacher, PersonFactory, studentArr} from './personLib.js';
import {School} from './school.js';

// небольшая шапка, чтобы привести вёрстку к виду прошлых заданий

const div = document.createElement('div');
  div.id = 'wraper';
  const txt = `
  <header>
      <img src="img/logo.jpg" alt="Логотип Тензор"/>
      <span title="Tensor School">Tensor School</span>
      <p title="Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.">Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.</p>
  </header>
  <div id="main-content">                               
  </div>
  `;
  div.innerHTML = txt;
  document.body.append(div);



// проинициализируем фабрику
const factory = new PersonFactory();

// создадим школу (если есть для нее фабрика, то тоже через фабрику) 
let school = new School();

// добавим в список школы студентов используйте те данные, которые у вас есть
// Vasia и пр. тут скорее для примера
// если методы называются по другому, поменяйте
// по желанию можно добавить больше
studentArr.forEach((item) => {
  school.enroll(item);
})

// отрисуем всех студентов в dom 
// если методы называются по другому, поменяйте
// точка монтирования document.body может быть изменена на любой другой элемент DOM
school.appendToDOM(document.getElementById('main-content'));

// в итоге на странице должны получить список студентов и учителей
// папка js будет содержать несколько файлов, минимум 3, а лучше больше