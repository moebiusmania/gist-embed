# gist-embed
[![Build Status](https://travis-ci.org/moebiusmania/gist-embed.svg?branch=master)](https://travis-ci.org/moebiusmania/gist-embed)

Component for easily embed a GitHub Gist in your webpages/webapps. Built on top of the `Custom Elements` v1 spec and the `Gist REST API`.

Works in both the browser or a Webpack powered project.

### Install
It's **not** available yet on NPM... just wait a few days!
```
$ npm install gist-embed
--- or --
$ yarn add gist-embed
```

### How to use [Browser]
```html
<!-- You may want to load the Custom Elements polyfill before -->
<script src="./node_modules/gist-embed/dist/gist-embed.js"></script>
```

### How to use [Webpack]
```javascript
// Full script (class + customElements.define)
import 'gist-embed';

// Class only, if you don't want to execute customElements.define immediately
import GistEmbed from 'gist-embed/src/class';
```

### Run project locally

### Tests

### License
Released under the [MIT](LICENSE) license.
