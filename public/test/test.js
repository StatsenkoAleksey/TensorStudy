import {Person} from '../js/person.js';
import {PersonFactory} from '../js/personFactory.js';
import { Student } from '../js/student.js';
import { Teacher } from '../js/teacher.js';

describe("Тестирование Фабрики", function() {
   'use strict';
    it('Тест конструктора с пустыми параметрами', function() {
        // arrange
        const params = {};

        // act
        const personFactory = new PersonFactory(params);
        const person = personFactory.create({});

        //assert
        assert(person instanceof Person);
    });

    
    it('Тест конструктора с параметрами cтудента', function() {
        // arrange
        const params = {
            fullName: "Миша Петров",
            photo: "img/ava01.jpg",
            university: "Угату",
            course: 2,
            birthDate: "2000-05-01T00:00:00.000Z",
            phone: "+7 (963) 123-45-67",
            active: "2020-04-11T18:01:47.339Z"
        };

        // act
        const personFactory = new PersonFactory(params);
        const person = personFactory.create(params);
        //assert
        assert(person instanceof Student);
    });

    
    it('Тест конструктора с параметрами преподавателя', function() {
        // arrange
        const params = {
            fullName: "Вика Цукерберг",
            photo: "img/ava05.jpg",
            university: "БГПУ",
            post: "Преподаватель",
            birthDate: "2001-02-08T00:00:00.000Z",
            phone: "+7 (963) 123-45-67",
            active: "2020-03-05T15:00:00.000Z"
        };

        // act
        const personFactory = new PersonFactory(params);
        const person = personFactory.create(params);
        //assert
        assert(person instanceof Teacher);
    });

    
    it('Тест функции возврата даты рождения', function() {
        // arrange
        const params = {
            fullName: "Вика Цукерберг",
            photo: "img/ava05.jpg",
            university: "БГПУ",
            post: "Преподаватель",
            birthDate: "2001-02-08T00:00:00.000Z",
            phone: "+7 (963) 123-45-67",
            active: "2020-03-05T15:00:00.000Z"
        };

        // act
        const personFactory = new PersonFactory(params);
        const person = personFactory.create(params);

        const birthdayStr = person.birthDateStr;

        //assert
        assert.equal(birthdayStr, '8 февраля');
    });

    
    it('Тест функции возврата возраста "год"', function() {
        // arrange
        const params = {
            fullName: "Вика Цукерберг",
            photo: "img/ava05.jpg",
            university: "БГПУ",
            post: "Преподаватель",
            birthDate: "1999-02-08T00:00:00.000Z",
            phone: "+7 (963) 123-45-67",
            active: "2020-03-05T15:00:00.000Z"
        };

        // act
        const personFactory = new PersonFactory(params);
        const person = personFactory.create(params);
        const birthdayStr = person.age;

        //assert
        assert.equal(birthdayStr, '21 год');
    });

    
    it('Тест функции возврата возраста "года"', function() {
        // arrange
        const params = {
            fullName: "Вика Цукерберг",
            photo: "img/ava05.jpg",
            university: "БГПУ",
            post: "Преподаватель",
            birthDate: "1998-02-08T00:00:00.000Z",
            phone: "+7 (963) 123-45-67",
            active: "2020-03-05T15:00:00.000Z"
        };

        // act
        const personFactory = new PersonFactory(params);
        const person = personFactory.create(params);
        const birthdayStr = person.age;

        //assert
        assert.equal(birthdayStr, '22 года');
    });

    
    it('Тест функции возврата возраста "лет"', function() {
        // arrange
        const params = {
            fullName: "Вика Цукерберг",
            photo: "img/ava05.jpg",
            university: "БГПУ",
            post: "Преподаватель",
            birthDate: "2001-02-08T00:00:00.000Z",
            phone: "+7 (963) 123-45-67",
            active: "2020-03-05T15:00:00.000Z"
        };

        // act
        const personFactory = new PersonFactory(params);
        const person = personFactory.create(params);
        const birthdayStr = person.age;

        //assert
        assert.equal(birthdayStr, '19 лет');
    })
});

mocha.run();
