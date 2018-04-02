const store = {
  timeoutId: null,
  head: document.getElementsByTagName('head')[0],
  options: {
    timeout: 5000,
    jsonpCallback: 'callback',
    jsonpCallbackFunction: null
  }
};

const getRandom = () => Math.ceil(Math.random() * 100000);

const createCallback = () => `jsonp_${Date.now()}_${getRandom()}`;

const maybeClearTimeout = id => id ? clearTimeout(id) : null;

const removeScript = id => {
  const script = document.getElementById(id);
  if (script) {
    store.head.removeChild(script);
  }
};

const clearFunction = (name, id) => {
  try {
    delete window[name];
  } catch (e) {
    window[name] = undefined;
  }
  removeScript(id);
};

const fetchJsonp = (_url, options = {}) => {
  const timeout = options.timeout || store.options.timeout;
  const jsonpCallback = options.jsonpCallback || store.options.jsonpCallback;

  return new Promise((resolve, reject) => {
    const callback = options.jsonpCallbackFunction || createCallback();
    const id = `${jsonpCallback}_${callback}`;

    window[callback] = response => {
      resolve({
        ok: true,
        // Keep consistent with fetch API
        json: () => Promise.resolve(response)
      });

      maybeClearTimeout(store.timeoutId);
      clearFunction(callback, id);
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    const params = (_url.indexOf('?') === -1) ? '?' : '&';
    const url = _url + params;

    const script = document.createElement('script');
    script.setAttribute('src', `${url}${jsonpCallback}=${callback}`);
    if (options.charset) {
      script.setAttribute('charset', options.charset);
    }
    script.id = id;
    store.head.appendChild(script);

    store.timeoutId = setTimeout(() => {
      reject(new Error(`JSONP request to ${_url} timed out`));

      clearFunction(callback, id);
      window[callback] = () => clearFunction(callback, id);
    }, timeout);

    // Caught if got 404/500
    script.addEventListener('error', () => {
      reject(new Error(`JSONP request to ${_url} failed`));

      clearFunction(callback, id);
      maybeClearTimeout(store.timeoutId);
    });
  });
};

export default fetchJsonp;
