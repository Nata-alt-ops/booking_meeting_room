import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';


import {
  $isAuthenticated,
  $canBook,
  $showModal,
  setShowModal,
  fetchRooms,
  fetchBookings,
} from '../../components/stores/bookingStore';

import { Header } from '../Header/Header';
import { RoomList } from '../RoomList/RoomList';
import { MyBookings } from '../MyBookings/MyBookings';
import { BookingModal } from '../BookingModal/BookingModal';
import { Notification } from '../Notification/Notification';



export const MainLayout: React.FC = () => {
  const isAuthenticated = useUnit($isAuthenticated);
  const canBook = useUnit($canBook);

  useEffect(() => {
    fetchRooms();
    fetchBookings({});
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <RoomList />
        {canBook && (
          <>
            <BookingButton />
            <MyBookings />
          </>
        )}
        <BookingModal />
        <Notification />
      </div>
    </div>
  );
};

// Отдельный компонент для кнопки бронирования
const BookingButton: React.FC = () => {
  const {showModal, setShowModal: any } = useUnit({
    showModal: $showModal,
    setShowModal: setShowModal,
  });

  return (
    <button
      className="btn btn-primary btn-lg mt-4 w-100"
      disabled={!showModal}
      onClick={() => setShowModal(true)}
    >
      🔒 Забронировать выбранное время
    </button>
  );
};