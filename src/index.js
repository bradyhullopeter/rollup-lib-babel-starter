import Nanocomponent from "nanocomponent";
import html from "nanohtml";
import "./index.scss";
import "./polyfills";

export class Button extends Nanocomponent {
  constructor() {
    super();
    this.color = null;
  }

  createElement(color) {
    this.color = color;
    return html` <button class="button-button">Click Me</button> `;
  }

  // Implement conditional rendering
  update(newColor) {
    return newColor !== this.color;
  }
}
