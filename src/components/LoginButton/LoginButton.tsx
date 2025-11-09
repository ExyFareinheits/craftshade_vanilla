import React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import './LoginButton.scss';

const LoginButton: React.FC = () => {
  const { login } = useAuth();

  return (
    <button className="login-button" onClick={login}>
      <FaDiscord className="login-button__icon" />
      <span>Увійти через Discord</span>
    </button>
  );
};

export default LoginButton;
