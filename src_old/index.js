'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { getData, _compLoader, _compEmbed } from './methods';
import properties from './props';
import template from './template.html';

export class GistEmbed extends mixinBehaviors(
  [{ _compLoader, _compEmbed }], PolymerElement) {

  static get properties() { return properties }

  static get template() { return template }

  connectedCallback(){
    super.connectedCallback();
    
    getData(this.user, this.uuid).then(data => {
      this._css = data.stylesheet;
      this._html = data.div;
      this._loading = data.loading;
    });
  }

}

customElements.define('gist-embed', GistEmbed);