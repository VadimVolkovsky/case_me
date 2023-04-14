export const BASE_URL = 'https://caseme.pythonanywhere.com';

const request = ({
  url,
  method = 'POST',
  token,
  data
}) => {
  return fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...!!token && { 'Authorization': 'Bearer ${token}' }
      },
      ...!!data && { body: JSON.stringify(data) }
    })
    .then((res) => {
      if(!res.ok) return Promise.reject(res.status);

      return res.json()
    });
}

/* export const register = (username, email, password) => {
  return request({
    url: '/api/users/',
    data: {username, email, password}
  });
}; */

export const authorize = (email, password) => {
  return request({
    url: '/api/auth/jwt/create',
    data: {email, password}
  });
};

export const getContent = (token) => {
  return request({
    url: '/api/users/me/',
    method: 'GET',
    token
  });
}