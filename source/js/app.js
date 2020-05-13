const studentArr = [
  {
    fullName: 'Вася Иванов',
    university: 'УГАТУ',
    course: 2,
    birthDate: new Date(2000, 1, 1),
    photoUrl: 'img/ava01.jpg'
  },

  {
    fullName: 'Маша Иванова',
    university: 'УГАТУ',
    course: 3,
    birthDate: new Date(1999, 5, 3),
    photoUrl: 'img/ava02.jpg'
  },

  {
    fullName: 'Ира Петрова',
    university: 'УГАТУ',
    course: 1,
    birthDate: new Date(2001, 9, 22),
    photoUrl: 'img/ava03.jpg'
  },

  {
    fullName: 'Петя Сидоров',
    university: 'УГАТУ',
    birthDate: new Date(1999, 10, 10),
    photoUrl: 'img/ava04.jpg',
    post: 'Ассистент'
  },

  {
    fullName: 'Маша Петрова',
    university: 'УГАТУ',
    birthDate: new Date(1998, 7, 14),
    photoUrl: 'img/ava05.jpg',
    post: 'Преподаватель'
  },

  {
    fullName: 'Иван Иванов',
    university: 'УГАТУ',
    birthDate: new Date(1940, 6, 2),
    photoUrl: 'img/ava06.jpg',
    post: 'Профессор'
  }
];

class Person {

  constructor(params) {
    this.fullName = params.fullName;
    this.university = params.university;
    this.birthDate = params.birthDate;
    this.photoUrl = params.photoUrl;
    this.isMiniCardOpen = false;
    this.type = 'person';
    this.state = '';
    this.job ='';
    this.jobState = '';
  }

  get birthDateStr() {
    const monthName = ['января', 'февраля', 'марта', 
                      'апреля', 'мая', 'июня', 'июля', 
                      'августа', 'сентября', 'октября', 
                      'ноября', 'декабря'];
    const dateStr = this.birthDate.getDate() + ' ' +
                  monthName[this.birthDate.getMonth()];
    return dateStr;
  }

  get age() {
    const today = new Date();
    let studentAge = today.getFullYear() - this.birthDate.getFullYear();
    const m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      studentAge--;
    }
    let ageStr = ' ';
    if (studentAge < 10 || studentAge > 20) {
      if (studentAge % 10 === 1) {
        ageStr += 'год';
      } else if (studentAge % 10 > 1 && studentAge % 10 < 5) {
        ageStr += 'года';
      } else {
        ageStr += 'лет';
      }
    } else {
      ageStr += 'лет';
    }
    return studentAge + ageStr;
  }

  appendToDOM() {
    const layout = this.render();
    document.getElementById('main-content').append(layout);
    layout.onclick = (e) => {
      if (!this.isMiniCardOpen) {
        this.openCard(e.currentTarget);
      }
    };
  }
  
  render() {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const span = document.createElement('span');
    div.className = 'user';
    img.className = 'user-avatar';
    img.setAttribute('src', this.photoUrl);
    img.setAttribute('alt', 'Аватар пользователя');
    p.className = 'user-name';
    let txt = document.createTextNode(this.fullName);
    p.appendChild(txt);
    span.className = 'user-information';
    txt = document.createTextNode(this.university + ' ' + this.state);
    span.appendChild(txt);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(span);
    return div;
  }

  openCard(currentCard) {
    const div = document.createElement('div');
  
    const imgClose = document.createElement('img');
    imgClose.className = 'mini-card__close';
    imgClose.setAttribute('src', 'img/icon-off.png');
    imgClose.setAttribute('alt', 'Закрыть');
    div.className = 'mini-card';
    div.appendChild(imgClose);
    imgClose.onclick = (e) => {
      div.remove();
      this.isMiniCardOpen = false;
    };

    const pFullName = document.createElement('p');
    pFullName.className = 'mini-card__user-name';
    let txt = document.createTextNode(this.fullName);
    pFullName.appendChild(txt);
    div.appendChild(pFullName); 
  
    const pBirthdayTitle = document.createElement('p');
    pBirthdayTitle.className = 'mini-card__info-title';
    txt = document.createTextNode('День рождения');
    pBirthdayTitle.appendChild(txt);
    div.appendChild(pBirthdayTitle);
  
    const pBirthdayData = document.createElement('p');
    pBirthdayData.className = 'mini-card__info-data';
    txt = document.createTextNode(this.birthDateStr);
    pBirthdayData.appendChild(txt);
    div.appendChild(pBirthdayData);
  
    const pAgeData = document.createElement('p');
    pAgeData.className = 'mini-card__info-data';
    txt = document.createTextNode(this.age);
    pAgeData.appendChild(txt);
    div.appendChild(pAgeData);
  
    const pStudyTitle = document.createElement('p');
    pStudyTitle.className = 'mini-card__info-title';
    txt = document.createTextNode(this.job);
    pStudyTitle.appendChild(txt);
    div.appendChild(pStudyTitle);
  
    const pStudyData = document.createElement('p');
    pStudyData.className = 'mini-card__info-data';
    txt = document.createTextNode(this.university + ', ' + this.jobState);
    pStudyData.appendChild(txt);
    div.appendChild(pStudyData);
  
    const imgAvatar = document.createElement('img');
    imgAvatar.className = 'mini-card__avatar';
    imgAvatar.setAttribute('src', this.photoUrl);
    imgAvatar.setAttribute('alt', 'Аватар пользователя');
    div.appendChild(imgAvatar);
    
    this.isMiniCardOpen = true;

    currentCard.parentNode.append(div);    
    div.style.left = currentCard.offsetLeft + 'px';
    div.style.top = currentCard.offsetTop + 'px';  
    if (div.getBoundingClientRect().right > document.body.clientWidth) {
      div.style.left = document.body.clientWidth - div.getBoundingClientRect().width + 'px';
    }
    window.addEventListener("resize", (e) => {
      div.style.left = currentCard.offsetLeft + 'px';
      div.style.top = currentCard.offsetTop + 'px'; 
      if (div.getBoundingClientRect().right > document.body.clientWidth) {
        div.style.left = document.body.clientWidth - div.getBoundingClientRect().width + 'px';
      }
    });
  }

}

class Student extends Person {

  constructor(params) {
    super(params);
    this.course = params.course;
    this.type = 'student';
    this.state = this.course;
    this.job = 'Учится';
    this.jobState = this.course + ' курс';
  }

}


class Teacher extends Person {

  constructor(params) {
    super(params);
    this.post = params.post;
    this.type = 'teacher';
    this.state = this.post;
    this.job = 'Работает';
    this.jobState = this.state;
  }

}

class PersonFactory {
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

class SchoolList {
  constructor() {
    this.list = [];
  }

  add(person) {
    this.list.push(person);
  }
}

class School {
  constructor() {
    this.school = new SchoolList();
  }

  enroll(params) {
    const personFactory = new PersonFactory();
    let person = personFactory.create(params);
    this.school.add(person);
    return person;
  }

  dismiss(name) {
    this.school.list.map((item, index) => {
      if (item.fullName === name) {
        this.school.list.splice(index, 1);
      }
    })
  }

  getPerson(name) {
    const listOfPerson = [];
    this.school.list.map((item, index) => {
      if (item.fullName === name) {
        listOfPerson.push(item);
      }
    })
    return listOfPerson;
  }
}

function init () {
  const school = new School();
  studentArr.forEach((item) => {
    const person = school.enroll(item);
    person.appendToDOM();    
  })
  school.dismiss('Маша Иванова');
  console.log(school);
  console.log(school.getPerson('Маша Петрова'));
}
