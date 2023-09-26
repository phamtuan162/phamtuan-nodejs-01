class F8 {
  constructor() {}

  static component(name, options) {
    customElements.define(
      name,
      class extends HTMLElement {
        constructor() {
          super();
          this.options = options;
          this.data = options.data ? options.data() : {};
          this.attachShadow({ mode: "open" });
          this.render();
        }

        render() {
          const shadow = this.shadowRoot;
          const templateKey = Object.keys(this.options).find(
            (key) => typeof options[key] === "string"
          );
          if (templateKey) {
            const template = options[templateKey];
            const templateEl = document.createElement("template");
            templateEl.innerHTML = template;
            const templateNode = templateEl.content.cloneNode(true);
            shadow.appendChild(templateNode);
            this.updateTemplateVariables(template);
            this.setupButtonListeners();
          }
        }

        updateTemplateVariables(template) {
          const shadow = this.shadowRoot;
          const results = template.match(/{{.+?}}/g);
          if (!results) return;
          results.forEach((result) => {
            const variableResult = result.match(/{{(.+?)}}/)[1].trim();
            const elements = shadow.querySelectorAll("*");
            elements.forEach((element) => {
              if (element.textContent.includes(`{{${variableResult}}}`)) {
                element.textContent = element.textContent.replace(
                  `{{${variableResult}}}`,
                  this.data[variableResult]
                );
              }
            });
          });
        }

        setupButtonListeners() {
          const shadow = this.shadowRoot;
          const buttons = shadow.querySelectorAll("button");
          buttons.forEach((button) => {
            const match = button.outerHTML.match(/v-on:(\w+)="(\w+.*?)"/);
            if (match && match[1] && match[2]) {
              const btnEvent = match[1];
              const btnEventAttribute = match[2];
              button.addEventListener(btnEvent, () => {
                this.handleButtonClick(btnEventAttribute);
              });
            }
          });
        }

        handleButtonClick(btnEventAttribute) {
          if (
            btnEventAttribute === "count++" ||
            btnEventAttribute === "count--"
          ) {
            const countValue = eval(`this.data.${btnEventAttribute}`);
            if (countValue >= 0) {
              this.updateCount(countValue);
            }
          } else {
            const titleMatch = btnEventAttribute.match(/title=['"](.+?)['"]/);
            if (titleMatch && titleMatch[1]) {
              const newTitle = titleMatch[1];
              this.updateTitle(newTitle);
            }
          }
        }

        updateCount(countValue) {
          const h2 = this.shadowRoot.querySelector("h2");
          h2.textContent = `Đã đếm: ${countValue} lần`;
        }

        updateTitle(newTitle) {
          const h1 = this.shadowRoot.querySelector("h1");
          h1.textContent = newTitle;
        }
      }
    );
  }
}

new F8();
