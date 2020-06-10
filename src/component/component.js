export class Component {

  constructor(params) {
    this.params = params;
    this.container = undefined;
  }

  render() {
    return `<div></div>`;
  }

  mount(parentContainer, position) {

    this.beforeMount();

    const newComponent = document.createElement('div');
    newComponent.innerHTML = this.render(this.params);
    this.container = newComponent.firstElementChild;
    parentContainer.insertAdjacentElement(position || 'beforeend', this.container);
    newComponent.remove();

    this.afterMount();

  }

  update() {}

  unmount() {

    this.beforeUnmount();

    this.remiveContainer();

    this.afterUnmount();

  }

  removeContainer() {
    this.container.remove();
    this.container = undefined;
  }

  beforeMount() {}

  afterMount() {}

  beforeUnmount() {}

  afterUnmount() {}

}