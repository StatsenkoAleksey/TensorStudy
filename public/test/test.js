import {Person} from '../js/person.js';
import {Component} from '../js/component.js';
import {PersonFactory} from '../js/personFactory.js';
import { Student } from '../js/student.js';

describe("Тестирование класса Person", function() {
   'use strict';
    it('Тест конструктора', function() {
        // arrange
        const params = {};

        // act
        const personFactory = new PersonFactory(params);
        const person = personFactory.create({});

        //assert
        assert(person instanceof Person);
    })

    
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
        const person = personFactory.create({});
        console.log(person);
        //assert
        assert(person instanceof Student);
    })
});

mocha.run();
