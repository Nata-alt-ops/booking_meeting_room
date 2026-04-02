// ⚠️ ВАЖНО: Файл должен называться BookingModal.tsx (с большой буквы)
// и лежать в папке: src/components/BookingModal/

import React, { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import {
  $showModal,
  $selectedRoom,
  $selectedDate,
  $selectedTimeRange,
  $editingBooking,
  setShowModal,
  createBooking,
  updateBooking,
  setEditingBooking,
  clearSelection,
} from '../stores/bookingStore';

// ✅ ЭКСПОРТ ОБЯЗАТЕЛЬНО ДОЛЖЕН БЫТЬ ТАК:
export const BookingModal: React.FC = () => {
  const showModal = useUnit($showModal);
  const selectedRoom = useUnit($selectedRoom);
  const selectedDate = useUnit($selectedDate);
  const selectedTimeRange = useUnit($selectedTimeRange);
  const editingBooking = useUnit($editingBooking);

  const [topic, setTopic] = useState('');

  useEffect(() => {
    if (editingBooking) {
      setTopic(editingBooking.topic);
    } else {
      setTopic('');
    }
  }, [editingBooking, showModal]);

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || !topic) return;

    if (editingBooking) {
      updateBooking({ id: editingBooking.id, topic });
    } else {
      createBooking({
        roomId: selectedRoom.id,
        date: selectedDate,
        startTime: selectedTimeRange.start || 9,
        endTime: selectedTimeRange.end || 10,
        topic,
      });
    }

    setShowModal(false);
    setEditingBooking(null);
    clearSelection();
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingBooking(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{editingBooking ? '✏️ Редактирование' : '🔒 Бронирование'}</h5>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Комната</label>
            <input type="text" className="form-control" value={selectedRoom?.name || ''} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Дата</label>
            <input type="text" className="form-control" value={new Date(selectedDate).toLocaleDateString('ru-RU')} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Время</label>
            <input
              type="text"
              className="form-control"
              value={`${selectedTimeRange.start || 9}:00 - ${selectedTimeRange.end || 10}:00`}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Тема встречи *</label>
            <input
              type="text"
              className="form-control"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Например: Планерка отдела"
              required
            />
          </div>

          <div className="modal-footer d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              {editingBooking ? 'Сохранить' : 'Забронировать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};