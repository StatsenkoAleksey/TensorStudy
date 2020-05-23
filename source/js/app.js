'use strict';

import {studentArr} from './personLib.js';
import {School} from './school.js';
import {Header} from './header.js';

// небольшая шапка, чтобы привести вёрстку к виду прошлых заданий

const header = new Header();
header.mount(document.body);

// создадим школу 
let school = new School();

// добавление в список школы студентов и учителей
studentArr.forEach((item) => {
  school.enroll(item);
})

// отрисовка всех в dom 
school.mount(document.getElementById('main-content'));
