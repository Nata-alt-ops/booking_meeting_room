import React from 'react';
import { useUnit } from 'effector-react';
import { $user, logout } from '../stores/bookingStore';


export const Header: React.FC = () => {
  const user = useUnit($user);

  return (
    <header className="app-header">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <span className="logo-icon">🏢</span>
            <span className="logo-text">Переговорные комнаты</span>
          </div>
          {user && (
            <div className="user-info">
              <span className="user-name">{user.fullName}</span>
              <span className="user-role badge bg-primary ms-2">{user.role}</span>
              <button className="btn btn-outline-light btn-sm ms-3" onClick={() => logout()}>
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};