import React from 'react';
import { useUnit } from 'effector-react';
import { Room, TimeSlot } from '../types';
import { $selectedRoomId, $selectedTimeRange, selectRoom, selectTimeSlot, $canBook } from '../stores/bookingStore';

interface RoomCardProps {
  room: Room;
  timeSlots: TimeSlot[];
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, timeSlots }) => {
  const selectedRoomId = useUnit($selectedRoomId);
  const selectedTimeRange = useUnit($selectedTimeRange);
  const canBook = useUnit($canBook);

  const isSelected = selectedRoomId === room.id;

  return (
    <div className={`room-card ${isSelected ? 'selected' : ''}`} onClick={() => selectRoom(room.id)}>
      <img src={room.image} alt={room.name} className="room-image" />
      <div className="room-info">
        <div className="room-header">
          <h5 className="room-name">{room.name}</h5>
          <span className="room-number badge bg-secondary">{room.roomNumber}</span>
        </div>
        <p className="room-capacity">👥 {room.capacity} человек</p>
        <div className="room-equipment">
          {room.equipment.map((item:any) => (
            <span key={item} className="badge bg-light text-dark me-1">{item}</span>
          ))}
        </div>

        {isSelected && canBook && (
          <div className="time-slots mt-3">
            <p className="small text-muted mb-2">Нажмите на время для выбора:</p>
            <div className="slots-grid">
              {timeSlots.map((slot) => (
                <div
                  key={slot.hour}
                  className={`slot ${slot.isBooked ? 'booked' : ''} ${slot.isSelected ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectTimeSlot({ roomId: room.id, hour: slot.hour });
                  }}
                >
                  {slot.hour}
                </div>
              ))}
            </div>
            <div className="slots-labels d-flex justify-content-between">
              <small>09:00</small>
              <small>19:00</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};