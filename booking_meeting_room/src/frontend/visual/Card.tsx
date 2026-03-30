import React from "react";
import './Card.scss';

export const Card = () => {
  return (
    <div className="site">
      {/* Шапка */}
      <div className="d-flex justify-content-center align-items-center header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-4">
              <h3 className="logo">🏢 Переговорные</h3>
            </div>
            <div className="col-4 text-end">
              <span className="user-name">👤 Алексей Иванов</span>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="container main-content">
        {/* Фильтры и дата */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="filters-card p-3">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <label className="form-label">📅 Дата</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">🏢 Комната</label>
                  <select className="form-select">
                    <option>Все комнаты</option>
                    <option>Альфа</option>
                    <option>Бета</option>
                    <option>Гамма</option>
                  </select>
                </div>
                <div className="col-md-4 text-end">
                  <button className="btn btn-primary">🔍 Найти</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Список комнат */}
        <div className="row">
          <div className="col-12">
            <h4 className="section-title mb-3">Доступные комнаты</h4>
          </div>
          
          {/* Комната 1 */}
          <div className="col-md-4 mb-4">
            <div className="room-card">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400" 
                className="room-image" 
                alt="Room" 
              />
              <div className="room-info p-3">
                <h5 className="room-name">Переговорная «Альфа»</h5>
                <p className="room-capacity">👥 6 человек</p>
                <div className="room-equipment mb-3">
                  <span className="badge bg-secondary me-1">Проектор</span>
                  <span className="badge bg-secondary me-1">WiFi</span>
                  <span className="badge bg-secondary me-1">Whiteboard</span>
                </div>
                <button className="btn btn-outline-primary w-100">Забронировать</button>
              </div>
            </div>
          </div>

          {/* Комната 2 */}
          <div className="col-md-4 mb-4">
            <div className="room-card">
              <img 
                src="https://images.unsplash.com/photo-1517502884422-41e157d4430c?w=400" 
                className="room-image" 
                alt="Room" 
              />
              <div className="room-info p-3">
                <h5 className="room-name">Зал «Бета»</h5>
                <p className="room-capacity">👥 12 человек</p>
                <div className="room-equipment mb-3">
                  <span className="badge bg-secondary me-1">Проектор</span>
                  <span className="badge bg-secondary me-1">Видеоконференция</span>
                </div>
                <button className="btn btn-outline-primary w-100">Забронировать</button>
              </div>
            </div>
          </div>

          {/* Комната 3 */}
          <div className="col-md-4 mb-4">
            <div className="room-card">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400" 
                className="room-image" 
                alt="Room" 
              />
              <div className="room-info p-3">
                <h5 className="room-name">Кабинет «Гамма»</h5>
                <p className="room-capacity">👥 4 человека</p>
                <div className="room-equipment mb-3">
                  <span className="badge bg-secondary me-1">TV</span>
                  <span className="badge bg-secondary me-1">WiFi</span>
                </div>
                <button className="btn btn-outline-primary w-100">Забронировать</button>
              </div>
            </div>
          </div>
        </div>

        {/* Мои бронирования */}
        <div className="row mt-5">
          <div className="col-12">
            <h4 className="section-title mb-3">Мои бронирования</h4>
            <div className="bookings-list">
              <div className="booking-item p-3 mb-2">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <strong>🏢 Переговорная «Альфа»</strong>
                  </div>
                  <div className="col-md-3">
                    <span>📅 25.12.2024</span>
                  </div>
                  <div className="col-md-3">
                    <span>⏰ 10:00 - 11:00</span>
                  </div>
                  <div className="col-md-2 text-end">
                    <button className="btn btn-sm btn-danger">Отмена</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};