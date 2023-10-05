import React, { useReducer } from 'react';
import loginReducer from './loginReducer';
import './LoginCard.css';
import { useNavigate } from 'react-router-dom';

function LoginCard({ onLogin }) {
  const initialState = {
    email: '',
    username: '',
    password: '',
    showPassword: false,
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log('Logged In!');
    onLogin();
    navigate('/home');
  };

  return (
    <div className='login-card'>
      <h2>MOVIETRACK</h2>

      <input
        type='text'
        placeholder='Email Address'
        value={state.email}
        onChange={(e) =>
          dispatch({ type: 'SET_EMAIL', payload: e.target.value })
        }
      />

      <input
        type='text'
        placeholder='Username'
        value={state.username}
        onChange={(e) =>
          dispatch({ type: 'SET_USERNAME', payload: e.target.value })
        }
      />

      <div className='password-container'>
        <input
          type={state.showPassword ? 'text' : 'password'}
          placeholder='Password'
          value={state.password}
          onChange={(e) =>
            dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
          }
        />
        <button onClick={() => dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })}>
          {state.showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <div>
        <button onClick={handleLoginClick}>Log In</button>
        <button>Create Account</button>
      </div>
    </div>
  );
}

export default LoginCard;
