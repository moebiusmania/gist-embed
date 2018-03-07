
import fetchJsonp from 'fetch-jsonp';

const extend = (obj, params) => Object.assign({}, obj, params);

export default (user, uuid) => {
  const url = `https://gist.github.com/${user}/${uuid}.json`;

  return fetchJsonp(url)
    .then(res => res.json())
    .then(data => extend(data, {loading: false}));
};
