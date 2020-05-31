export class DataSet {

  constructor(options) {
    this.options = {
      host: 'http://localhost:8080/api/',
      object: options.object
    }
  }

  query(query, options, params) {
    let url = new URL(this.options.host);
    url.pathname += query;
    for (let k in params) {
      url.searchParams.set(k, params[k]);
    }
    return fetch(url, options).then(response => { return response.json()});
  }

  create(data) {
    
  }

  read(id) {
    return this.query(
      `${this.options.object}/${id}`,
      {
        method: 'GET'
      }
    );
  }

  list(page, limit) {
    return this.query(
      `${this.options.object}`,
      {
        method: 'GET'
      },
      {
        '_page': page,
        '_limit': limit
      }
    );
  }

  update() {

  }

  delete() {

  }

}