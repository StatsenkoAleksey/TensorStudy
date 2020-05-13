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
    course: 3,
    birthDate: new Date(1999, 10, 10),
    photoUrl: 'img/ava04.jpg'
  },

  {
    fullName: 'Маша Петрова',
    university: 'УГАТУ',
    course: 2,
    birthDate: new Date(2000, 7, 14),
    photoUrl: 'img/ava05.jpg'
  },

  {
    fullName: 'Иван Иванов',
    university: 'УГАТУ',
    course: 4,
    birthDate: new Date(1940, 6, 2),
    photoUrl: 'img/ava06.jpg'
  }
];


class Student {

  constructor(params) {
    this.fullName = params.fullName;
    this.university = params.university;
    this.course = params.course;
    this.birthDate = params.birthDate;
    this.photoUrl = params.photoUrl;
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
    return studentAge;
  }

  render() {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const span = document.createElement('span');
    div.setAttribute('class', 'user');
    img.setAttribute('class', 'user-avatar');
    img.setAttribute('src', this.photoUrl);
    img.setAttribute('alt', 'Аватар пользователя');
    p.setAttribute('class', 'user-name');
    let txt = document.createTextNode(this.fullName);
    p.appendChild(txt);
    span.setAttribute('class', 'user-information');
    txt = document.createTextNode(this.university + ' ' + this.course);
    span.appendChild(txt);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(span);
    return div;
  }

  appendToDOM() {
    const layout = this.render();
    document.getElementById('main-content').append(layout);
    layout.onclick = (e) => {
        this.openCard(e.currentTarget);
    };
  }

  openCard(currentCard) {
    const div = document.createElement('div');
  
    const imgClose = document.createElement('img');
    imgClose.setAttribute('class', 'mini-card__close');
    imgClose.setAttribute('src', 'img/icon-off.png');
    imgClose.setAttribute('alt', 'Закрыть');
    div.setAttribute('class', 'mini-card');
    div.appendChild(imgClose);
    imgClose.onclick = (e) => {
      div.remove();
    };

    const pFullName = document.createElement('p');
    pFullName.setAttribute('class', 'mini-card__user-name');
    let txt = document.createTextNode(this.fullName);
    pFullName.appendChild(txt);
    div.appendChild(pFullName); 
  
    const pBirthdayTitle = document.createElement('p');
    pBirthdayTitle.setAttribute('class', 'mini-card__info-title');
    txt = document.createTextNode('День рождения');
    pBirthdayTitle.appendChild(txt);
    div.appendChild(pBirthdayTitle);
  
    const pBirthdayData = document.createElement('p');
    pBirthdayData.setAttribute('class', 'mini-card__info-data');
    txt = document.createTextNode(this.birthDateStr);
    pBirthdayData.appendChild(txt);
    div.appendChild(pBirthdayData);
  
    const pAgeData = document.createElement('p');
    pAgeData.setAttribute('class', 'mini-card__info-data');
    txt = document.createTextNode(this.age + ' лет');
    pAgeData.appendChild(txt);
    div.appendChild(pAgeData);
  
    const pStudyTitle = document.createElement('p');
    pStudyTitle.setAttribute('class', 'mini-card__info-title');
    txt = document.createTextNode('Учится');
    pStudyTitle.appendChild(txt);
    div.appendChild(pStudyTitle);
  
    const pStudyData = document.createElement('p');
    pStudyData.setAttribute('class', 'mini-card__info-data');
    txt = document.createTextNode(this.university + ', ' + this.course + ' курс');
    pStudyData.appendChild(txt);
    div.appendChild(pStudyData);
  
    const imgAvatar = document.createElement('img');
    imgAvatar.setAttribute('class', 'mini-card__avatar');
    imgAvatar.setAttribute('src', this.photoUrl);
    imgAvatar.setAttribute('alt', 'Аватар пользователя');
    div.appendChild(imgAvatar);
    
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
};


function init () {
  studentArr.forEach((item) => {
    const student = new Student(item);
    student.appendToDOM();    
  })
}
