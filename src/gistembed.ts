import getData from "./libs/get";

export default class GistEmbed extends HTMLElement {
  render(data: any) {
    const value: string = this.getAttribute("height") || "0";
    const height: number = parseInt(value) || 50;

    this.innerHTML = `
      <link rel="stylesheet" href="${data.stylesheet}">
      <div style="min-height: ${height}px">${data.div}</div>
    `;
  }

  init() {
    const user: string = this.getAttribute("user") || "";
    const uuid: string = this.getAttribute("uuid") || "";

    getData(user, uuid).then((data) => this.render(data));
  }

  connectedCallback() {
    this.init();
  }
}

customElements.define("gist-embed", GistEmbed);
