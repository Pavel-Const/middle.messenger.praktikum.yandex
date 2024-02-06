import constants from "../constants";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

interface IRequest {
  headers?: { [key: string]: string };
  method?: string;
  data?: any;
}

function queryStringify(data: { [key: string]: string }) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class HTTPTransport {
  private apiUrl: string = "";

  constructor(apiPath: string) {
    this.apiUrl = `${constants.HOST}${apiPath}`;
  }

  get = (url: string, options: IRequest = {}) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHODS.GET
    });
  };

  post = (url: string, options?: { data: any }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHODS.POST
    });
  };

  put = (url: string, options?: { data: any }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHODS.PUT
    });
  };

  delete = (url: string, options?: { data: any }) => {
    return this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHODS.DELETE
    });
  };

  request = (url: string, options: IRequest = {}, timeout = 5000) => {
    const {
      headers = {},
      method,
      data
    } = options;
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.open(
        method,
        isGet && !!data && !(data instanceof FormData)
          ? `${url}${queryStringify(data)}`
          : url,
        true
      );
      xhr.withCredentials = true;

      if (!(data instanceof FormData)) {
        // Задайте заголовок Content-Type только если он явно указан
        // По умолчанию установите "application/json"
        if (!headers["Content-Type"]) {
          headers["Content-Type"] = "application/json";
        }
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(`${JSON.parse(xhr.response).reason}`));
        }
      };
      xhr.onabort = () => reject(new Error("Request was aborted by the user"));
      xhr.onerror = () => reject(new Error("Network error occurred"));
      xhr.ontimeout = () => reject(new Error("Request timed out"));
      xhr.timeout = timeout;
      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}
