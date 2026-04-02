import React from 'react';
import { useUnit } from 'effector-react';
import { $rooms, $timeSlots, $selectedDate, selectDate } from '../stores/bookingStore';
import { RoomCard } from '../RoomList/RoomCard';
import { format } from 'date-fns';

export const RoomList: React.FC = () => {
  const rooms = useUnit($rooms);
  const timeSlots = useUnit($timeSlots);
  const selectedDate = useUnit($selectedDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectDate(e.target.value);
  };

  const today = new Date();
  const minDate = format(today, 'yyyy-MM-dd');

  return (
    <div className="room-list-section">
      <div className="section-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="section-title">🚪 Доступные комнаты</h4>
          <p className="text-muted">Выберите комнату и время для бронирования</p>
        </div>
        <div className="date-picker">
          <label className="form-label mb-1">📅 Дата</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={handleDateChange}
            min={minDate}
          />
        </div>
      </div>

      <div className="rooms-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} timeSlots={timeSlots} />
        ))}
      </div>
    </div>
  );
};