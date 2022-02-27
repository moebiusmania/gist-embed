import fetchJsonp from "fetch-jsonp";

export default class GistEmbed extends HTMLElement {
  render(data: any) {
    const value: string = this.getAttribute("height") || "0";
    const height: number = parseInt(value) || 50;

    this.innerHTML = `
      <link rel="stylesheet" href="${data.stylesheet}">
      <div style="min-height: ${height}px">${data.div}</div>
    `;
  }

  getData(user: string, uuid: string) {
    const url: string = `https://gist.github.com/${user}/${uuid}.json`;

    return fetchJsonp(url)
      .then((res) => res.json())
      .then((data: any) => this.render(data));
  }

  connectedCallback() {
    const user: string = this.getAttribute("user") || "";
    const uuid: string = this.getAttribute("uuid") || "";

    this.getData(user, uuid);
  }
}

customElements.define("gist-embed", GistEmbed);
