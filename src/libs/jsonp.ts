interface Options {
  timeout?: number;
  jsonpCallback?: string;
  jsonpCallbackFunction?: any;
  charset?: string;
}

interface Store {
  timeoutId?: number;
  head: HTMLHeadElement;
  options?: Options;
}

const store: Store = {
  timeoutId: undefined,
  head: document.getElementsByTagName("head")[0],
  options: {
    timeout: 5000,
    jsonpCallback: "callback",
    jsonpCallbackFunction: null,
  },
};

const getRandom = (): number => Math.ceil(Math.random() * 100000);

const createCallback = (): string => `jsonp_${Date.now()}_${getRandom()}`;

const maybeClearTimeout = (id: any) => (id ? clearTimeout(id) : null);

const removeScript = (id: string) => {
  const script: HTMLScriptElement = document.getElementById(
    id
  ) as HTMLScriptElement;
  if (script) {
    store.head.removeChild(script);
  }
};

const clearFunction = (name: string, id: string) => {
  try {
    // @ts-ignore
    delete window[name];
  } catch (e) {
    // @ts-ignore
    window[name] = undefined;
  }
  removeScript(id);
};

const fetchJsonp = (_url: string, options: Options = {}): Promise<any> => {
  const timeout: number | undefined =
    options.timeout || store?.options?.timeout;
  const jsonpCallback: string | undefined =
    options.jsonpCallback || store?.options?.jsonpCallback;

  return new Promise((resolve, reject) => {
    const callback = options.jsonpCallbackFunction || createCallback();
    const id: string = `${jsonpCallback}_${callback}`;

    // @ts-ignore
    window[callback] = (response: any) => {
      resolve({
        ok: true,
        // Keep consistent with fetch API
        json: (): Promise<any> => Promise.resolve(response),
      });

      maybeClearTimeout(store.timeoutId);
      clearFunction(callback, id);
    };

    // Check if the user set their own params, and if not add a ? to start a list of params
    const params: string = _url.indexOf("?") === -1 ? "?" : "&";
    const url: string = _url + params;

    const script: HTMLScriptElement = document.createElement("script");
    script.setAttribute("src", `${url}${jsonpCallback}=${callback}`);
    if (options.charset) {
      script.setAttribute("charset", options.charset);
    }
    script.id = id;
    store.head.appendChild(script);

    store.timeoutId = setTimeout(() => {
      reject(new Error(`JSONP request to ${_url} timed out`));

      clearFunction(callback, id);
      // @ts-ignore
      window[callback] = () => clearFunction(callback, id);
    }, timeout);

    // Caught if got 404/500
    script.addEventListener("error", () => {
      reject(new Error(`JSONP request to ${_url} failed`));

      clearFunction(callback, id);
      maybeClearTimeout(store.timeoutId);
    });
  });
};

export default fetchJsonp;
