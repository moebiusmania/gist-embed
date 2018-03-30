const defaultOptions = {
  timeout: 5000,
  jsonpCallback: 'callback',
  jsonpCallbackFunction: null
};

const getRandom = () => Math.ceil(Math.random() * 100000);

const createCallback = () => `jsonp_${Date.now()}_${getRandom()}`;

const maybeClearTimeout = id => id ? clearTimeout(id) : null;

const clearFunction = functionName => {
  try {
    delete window[functionName];
  } catch (e) {
    window[functionName] = undefined;
  }
};

const removeScript = id => {
  console.log(id);
  const script = document.getElementById(id);
  if (script) {
    document.getElementsByTagName('head')[0].removeChild(script);
  }
};

const fetchJsonp = (_url, options = {}) => {
  const timeout = options.timeout || defaultOptions.timeout;
  const jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

  let timeoutId;

  return new Promise((resolve, reject) => {
    const callbackFunction = options.jsonpCallbackFunction || createCallback();
    const scriptId = `${jsonpCallback}_${callbackFunction}`;

    window[callbackFunction] = response => {
      resolve({
        ok: true,
        // Keep consistent with fetch API
        json: () => Promise.resolve(response)
      });

      maybeClearTimeout(timeoutId);

      removeScript(scriptId);
      clearFunction(callbackFunction);
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    const params = (_url.indexOf('?') === -1) ? '?' : '&';
    const url = _url + params;

    const jsonpScript = document.createElement('script');
    jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`);
    if (options.charset) {
      jsonpScript.setAttribute('charset', options.charset);
    }
    jsonpScript.id = scriptId;
    document.getElementsByTagName('head')[0].appendChild(jsonpScript);

    timeoutId = setTimeout(() => {
      reject(new Error(`JSONP request to ${_url} timed out`));

      clearFunction(callbackFunction);
      removeScript(scriptId);
      window[callbackFunction] = () => clearFunction(callbackFunction);
    }, timeout);

    // Caught if got 404/500
    jsonpScript.addEventListener('error', () => {
      reject(new Error(`JSONP request to ${_url} failed`));

      clearFunction(callbackFunction);
      removeScript(scriptId);
      maybeClearTimeout(timeoutId);
    });
  });
};

export default fetchJsonp;
