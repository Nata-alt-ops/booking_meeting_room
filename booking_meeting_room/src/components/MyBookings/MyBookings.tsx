import React from 'react';
import { useUnit } from 'effector-react';
import { $myBookings, deleteBooking, setEditingBooking, setShowModal } from '../stores/bookingStore';

export const MyBookings: React.FC = () => {
  const myBookings = useUnit($myBookings);

  if (myBookings.length === 0) {
    return (
      <div className="my-bookings-section">
        <h4 className="section-title mb-3">📋 Мои бронирования</h4>
        <div className="empty-state text-center p-5">
          <p className="text-muted">У вас пока нет запланированных встреч</p>
        </div>
      </div>
    );
  }

  const sortedBookings = [...myBookings].sort(
    (a, b) => new Date(`${a.date}T${a.startTime}`).getTime() - new Date(`${b.date}T${b.startTime}`).getTime()
  );

  return (
    <div className="my-bookings-section">
      <h4 className="section-title mb-3">📋 Мои бронирования</h4>
      <div className="bookings-list">
        {sortedBookings.map((booking) => (
          <div key={booking.id} className="booking-item">
            <div className="booking-header">
              <div>
                <h5 className="booking-room">{booking.roomName}</h5>
                <p className="booking-topic">{booking.topic}</p>
              </div>
              <span className="badge bg-success">Подтверждено</span>
            </div>
            <div className="booking-details">
              <span>📅 {new Date(booking.date).toLocaleDateString('ru-RU')}</span>
              <span>⏰ {booking.startTime}:00 - {booking.endTime}:00</span>
            </div>
            <div className="booking-actions">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  setEditingBooking(booking);
                  setShowModal(true);
                }}
              >
                ✏️ Изменить
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => {
                  if (confirm('Отменить эту встречу?')) {
                    deleteBooking(booking.id);
                  }
                }}
              >
                ❌ Отмена
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};