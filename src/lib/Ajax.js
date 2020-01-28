export default class Ajax {
    constructor() {
        this._method = "";
        this._url = "";
        this._timeout = 10000;
        this._body = "";
        this._result = "";
    }

    set url(_url) {
        this._url = _url;
    }

    get url() {
        return this._url;
    }

    set method(_method) {
        this._method = _method;
    }

    get method() {
        return this._method;
    }

    get body() {
        return this._body;
    }

    set body(_body) {
        this._body = _body;
    }
    get result() {
        return this._result;
    }

}


Ajax.prototype.send = function () {
    const xhr = new XMLHttpRequest();
    xhr.open(this._method, this._url);
    xhr.timeout = this._timeout;
    if (this.body && this.method === "POST") {
        xhr.upload(this.body);
    }
    xhr.send();
    this._result = new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.response);
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
                reject('url not found');
            }
        }
    });
    return this.result;
}