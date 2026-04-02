import React from 'react';
import { useUnit } from 'effector-react';
import { login, $isAuthenticated } from '../stores/bookingStore';

export const Login: React.FC = () => {
  const isAuthenticated = useUnit($isAuthenticated);

  const handleLogin = (username: string) => {
    login({ username });
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">🏢 Вход в систему</h2>
        <p className="login-subtitle">Выберите пользователя для теста</p>
        
        <div className="user-buttons">
          <button className="btn btn-primary w-100 mb-2" onClick={() => handleLogin('analyst')}>
            👤 Анна Аналитик (analyst)
          </button>
          <button className="btn btn-outline-secondary w-100" onClick={() => handleLogin('employee')}>
            👤 Иван Сотрудник (employee)
          </button>
        </div>

        <div className="login-info mt-4">
          <small className="text-muted">
            <strong>analyst</strong> — может бронировать комнаты<br/>
            <strong>employee</strong> — только просмотр
          </small>
        </div>
      </div>
    </div>
  );
};