import fetchJsonp from "fetch-jsonp";

interface GistData {
  created_at: string
  description: string
  div: string
  files: Array<string>
  owner: string
  public: boolean
  stylesheet: string
}

export default class GistEmbed extends HTMLElement {
  render({ div, stylesheet }: GistData): void {
    const value: string = this.getAttribute("height") || "0";
    const height: number = parseInt(value) || 50;

    this.innerHTML = `
      <link rel="stylesheet" href="${stylesheet}">
      <div style="min-height: ${height}px">${div}</div>
    `;
  }

  async getData(user: string, uuid: string): Promise<void> {
    const url: string = `https://gist.github.com/${user}/${uuid}.json`;

    const request = await fetchJsonp(url)
    const data: GistData = await request.json()
    
    this.render(data)
  }

  connectedCallback(): void {
    const user: string = this.getAttribute("user") || "";
    const uuid: string = this.getAttribute("uuid") || "";

    this.getData(user, uuid);
  }
}

customElements.define("gist-embed", GistEmbed);
