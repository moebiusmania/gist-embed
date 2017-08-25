'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import properties from './props';
import template from './template.html';
import fetchJsonp from 'fetch-jsonp';

export class GistEmbed extends PolymerElement {

  static get properties() { return properties }

  static get template() { return template }

  connectedCallback(){
    super.connectedCallback();
    
    this._getData(this.user, this.uuid).then(data => {
      this._css = data.stylesheet;
      this._html = data.div;
      this._loading = data.loading;
    });
  }

}

customElements.define('gist-embed', GistEmbed);