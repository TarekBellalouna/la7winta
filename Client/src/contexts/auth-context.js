import React from 'react';

export default React.createContext({
  token: localStorage.getItem('token') || null,
  userId: null,
  tokenExpiration: null,
  // eslint-disable-next-line
  login: (token, userId, tokenExpiration) => { },
  // logout: () => {},
});