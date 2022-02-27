// import jsonp from "./jsonp";
import fetchJsonp from "fetch-jsonp";

const extend = (obj: any, params: any) => Object.assign({}, obj, params);

export default (user: string, uuid: string) => {
  const url = `https://gist.github.com/${user}/${uuid}.json`;

  return fetchJsonp(url)
    .then((res) => res.json())
    .then((data: any) => extend(data, { loading: false }));
};
