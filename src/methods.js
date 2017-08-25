'use strict';

import fetchJsonp from 'fetch-jsonp';

const getData = (user, uuid) => {
  const url = `https://gist.github.com/${user}/${uuid}.json`;
  return fetchJsonp(url).then((res) => res.json())
    .then((data) => {
      const dataExt= Object.assign({}, data, { loading: false});
      return dataExt;
    });
}

const _compLoader = (loader) => {
  const arr = ['loading'];
  loader ? arr.push('show') : null;
  return arr.join(' ');
}

const _compEmbed = (loader, noMeta) => {
  const arr = loader ? [''] : ['show'];
  noMeta ? arr.push('no-meta') : null;
  return arr.join(' ');
}

export { getData, _compLoader, _compEmbed }