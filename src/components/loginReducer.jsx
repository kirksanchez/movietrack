import React from 'react';

function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'TOGGLE_SHOW_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
}

export default loginReducer;
