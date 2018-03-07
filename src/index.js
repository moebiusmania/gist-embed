
import getData from './libs';

export default class GistEmbed extends HTMLElement {
  render(data) {
    const height = this.getAttribute('height') || 50;

    this.innerHTML = `
      <link rel="stylesheet" href="${data.stylesheet}">
      <div style="min-height: ${height}px">${data.div}</div>
    `;
  }

  init() {
    const user = this.getAttribute('user') || '';
    const uuid = this.getAttribute('uuid') || '';

    getData(user, uuid)
      .then(data => this.render(data));
  }

  connectedCallback() {
    this.init();
  }
}

customElements.define('gist-embed', GistEmbed);
