"use strict";

import React from "react";
import { DataSet } from "./dataSet.js";
import { School } from "./school.js";
import { Header } from "./header.js";

function App() {
  
  const header = new Header();
  header.mount(document.body);

  // создадим школу
  let school = new School();

  // добавление в список школы студентов и учителей

  let dataSet = new DataSet({
    object: "person",
  });

  dataSet.list(1, 6).then((result) => {
    result.map((item) => {
      school.enroll(item);
    });

    // отрисовка всех в dom
    school.mount(document.getElementById("main-content"));
  });
}

export default App;