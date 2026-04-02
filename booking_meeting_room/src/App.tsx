import React from 'react';
import { Login } from './components/Login/Login';
import { MainLayout } from './components/MainLayout/MainLayout';

const App: React.FC = () => {
  return (
    <>
      <Login />
      <MainLayout />
    </>
  );
};

export default App;