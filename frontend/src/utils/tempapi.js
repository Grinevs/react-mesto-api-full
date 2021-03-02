class TempApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  addUser(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkRequest(res));
  }

  authUser(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkRequest(res));
  }

  getJWT(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._checkRequest(res));
  }

  // eslint-disable-next-line class-methods-use-this
  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }
}

const configApi = {
  // url: 'http://localhost:3000',
  url: 'https://api.ggg.students.nomoredomains.icu',
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
};

const tempapi = new TempApi(configApi);
export default tempapi;
