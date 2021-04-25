export const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(result => result);

export const getUsers = () => request(`/users`);
