
import fetchJsonp from 'fetch-jsonp';

export default (user, uuid) => {
  const url = `https://gist.github.com/${user}/${uuid}.json`;

  return fetchJsonp(url).then(res => res.json())
    .then(data => {
      const dataExt = Object.assign({}, data, {loading: false});
      return dataExt;
    });
};
