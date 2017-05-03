class CatsApi {

  static requestHeaders() {
    return {'X-Authorization': `Bearer ${sessionStorage.jwt}`}
  }

  static getAllEmployees() {
    const headers = this.requestHeaders();
    const request = new Request(`${process.env.API_HOST}/employees`, {
      method: 'GET',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateCat(cat) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${process.env.API_HOST}/api/v1/cats/${cat.id}`, {
      method: 'PUT',
      headers: headers, 
      body: JSON.stringify({cat: cat})
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createEmployee(employee) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${process.env.API_HOST}/employees`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(employee)
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteCat(cat) {
    const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
    const request = new Request(`${process.env.API_HOST}/api/v1/cats/${cat.id}`, {
      method: 'DELETE', 
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default CatsApi;
