import React from 'react';
import './Home.css';
import { useAuthContext } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuthContext();

  return (
    <div className="home">
      {user ? (
        <h1>Welcome!</h1>
      ) : (
        <h1>Welcome to My App</h1>
      )}
    </div>
  );
};

export default Home;
