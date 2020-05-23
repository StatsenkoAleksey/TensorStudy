import {Component} from './component.js';

export class Header extends Component {
  render() {
      return `
      <div id="wraper">
        <header>
          <img class="header__img" src="img/logo.jpg" alt="Tensor School"/>
          <span class="header__title" title="Tensor School">Tensor School</span>
          <p class="header__description" title="Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.">Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.</p>
        </header>
        <div id="main-content">                               
        </div>                             
      </div>
      `;
  }
}