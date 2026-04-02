// src/stores/bookingStore.ts
import { createEvent, createStore, sample, combine, createEffect } from 'effector';
import { User, Room, Booking, TimeRange } from '../types';

// ===== MOCK DATA =====
const MOCK_USERS: User[] = [
  { id: 1, username: 'analyst', fullName: 'Анна Аналитик', email: 'anna@company.com', role: 'analyst' },
  { id: 2, username: 'employee', fullName: 'Иван Сотрудник', email: 'ivan@company.com', role: 'employee' },
];

const MOCK_ROOMS: Room[] = [
  {
    id: 1,
    roomNumber: '305-А',
    name: 'Переговорная «Альфа»',
    capacity: 6,
    equipment: ['Проектор', 'WiFi', 'Whiteboard'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
  },
  {
    id: 2,
    roomNumber: '410-Б',
    name: 'Зал «Бета»',
    capacity: 12,
    equipment: ['Проектор', 'Видеоконференция', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1517502884422-41e157d4430c?w=400',
  },
  {
    id: 3,
    roomNumber: '201-В',
    name: 'Кабинет «Гамма»',
    capacity: 4,
    equipment: ['TV', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400',
  },
  {
    id: 4,
    roomNumber: '515-Г',
    name: 'Переговорная «Дельта»',
    capacity: 8,
    equipment: ['Проектор', 'WiFi', 'Видеоконференция'],
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400',
  },
];

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1,
    roomId: 1,
    roomName: 'Переговорная «Альфа»',
    userId: 1,
    userName: 'Анна Аналитик',
    date: new Date().toISOString().split('T')[0],
    startTime: 10,
    endTime: 11,
    topic: 'Собеседование кандидата',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    roomId: 2,
    roomName: 'Зал «Бета»',
    userId: 1,
    userName: 'Анна Аналитик',
    date: new Date().toISOString().split('T')[0],
    startTime: 14,
    endTime: 16,
    topic: 'Планерка отдела',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    roomId: 1,
    roomName: 'Переговорная «Альфа»',
    userId: 2,
    userName: 'Иван Сотрудник',
    date: new Date().toISOString().split('T')[0],
    startTime: 15,
    endTime: 16,
    topic: 'Презентация продукта',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
];

// ===== EVENTS =====
export const login = createEvent<{ username: string }>();
export const logout = createEvent<void>();
export const fetchRooms = createEvent<void>();
export const fetchBookings = createEvent<{ roomId?: number; date?: string }>();
export const selectRoom = createEvent<number | null>();
export const selectDate = createEvent<string>();
export const selectTimeSlot = createEvent<{ roomId: number; hour: number }>();
export const createBooking = createEvent<{
  roomId: number;
  date: string;
  startTime: number;
  endTime: number;
  topic: string;
}>();
export const updateBooking = createEvent<{ id: number; topic: string }>();
export const deleteBooking = createEvent<number>();
export const clearSelection = createEvent<void>();
export const setEditingBooking = createEvent<Booking | null>();
export const setShowModal = createEvent<boolean>();

// ===== STORES =====
export const $user = createStore<User | null>(null);
export const $isAuthenticated = createStore<boolean>(false);
export const $rooms = createStore<Room[]>([]);
export const $bookings = createStore<Booking[]>([]);
export const $selectedRoomId = createStore<number | null>(null);
export const $selectedDate = createStore<string>(new Date().toISOString().split('T')[0]);
export const $selectedTimeRange = createStore<TimeRange>({ start: null, end: null });
export const $editingBooking = createStore<Booking | null>(null);
export const $showModal = createStore<boolean>(false);
export const $notification = createStore<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);

// ===== COMPUTED =====
const WORK_HOURS = Array.from({ length: 10 }, (_, i) => i + 9); // 9:00 - 19:00

export const $timeSlots = combine(
  $rooms,
  $bookings,
  $selectedRoomId,
  $selectedDate,
  $selectedTimeRange,
  (rooms, bookings, selectedRoomId, selectedDate, selectedTimeRange) => {
    if (!selectedRoomId) return [];
    const roomBookings = bookings.filter(
      (b) => b.roomId === selectedRoomId && b.date === selectedDate && b.status === 'confirmed'
    );
    return WORK_HOURS.map((hour) => {
      const booking = roomBookings.find((b) => hour >= b.startTime && hour < b.endTime);
      const isSelected =
        selectedTimeRange.start !== null &&
        selectedTimeRange.end !== null &&
        hour >= selectedTimeRange.start &&
        hour < selectedTimeRange.end;
      return { hour, isBooked: !!booking, isSelected, booking };
    });
  }
);

export const $selectedRoom = combine($rooms, $selectedRoomId, (rooms, id) =>
  rooms.find((r) => r.id === id) || null
);

export const $myBookings = combine($user, $bookings, (user, bookings) =>
  user ? bookings.filter((b) => b.userId === user.id && b.status === 'confirmed') : []
);

export const $canBook = combine($user, (user) => user?.role === 'analyst');

export const $isSelectionValid = combine($selectedTimeRange, (range) =>
  range.start !== null && range.end !== null && range.end - range.start >= 1
);

// ===== SAMPLES =====
sample({
  clock: login,
  fn: ({ username }) => MOCK_USERS.find((u) => u.username === username) || null,
  target: $user,
});

sample({
  clock: $user,
  fn: (user) => !!user,
  target: $isAuthenticated,
});

sample({
  clock: logout,
  fn: () => null,
  target: $user,
});

sample({
  clock: fetchRooms,
  fn: () => MOCK_ROOMS,
  target: $rooms,
});

sample({
  clock: fetchBookings,
  fn: () => MOCK_BOOKINGS.filter((b) => b.status === 'confirmed'),
  target: $bookings,
});

sample({
  clock: selectRoom,
  fn: () => ({ start: null, end: null }),
  target: $selectedTimeRange,
});

// ===== ИСПРАВЛЕННАЯ ЛОГИКА ВЫБОРА ВРЕМЕНИ =====
sample({
  clock: selectTimeSlot,
  source: { 
    selectedRoomId: $selectedRoomId, 
    timeSlots: $timeSlots, 
    currentRange: $selectedTimeRange 
  },
  fn: ({ selectedRoomId, timeSlots, currentRange }, { roomId, hour }) => {
    // Если выбрали другую комнату - сброс и новый выбор
    if (selectedRoomId !== roomId) {
      return { start: hour, end: hour + 1 };
    }
    
    const slot = timeSlots.find((s) => s.hour === hour);
    // Нельзя выбрать занятое время
    if (slot?.isBooked) return currentRange;

    // Деструктуризация с дефолтными значениями для безопасности типов
    const { start, end } = currentRange;

    // Если начало не выбрано - выбираем текущий час
    if (start === null) {
      return { start: hour, end: hour + 1 };
    }

    // Если конец не выбран, но есть начало - расширяем
    if (end === null) {
      if (hour < start) return { start: hour, end: start };
      return { start, end: hour + 1 };
    }

    // Если оба выбраны - логика расширения/сужения
    if (hour < start) {
      return { start: hour, end };
    }
    if (hour >= end) {
      return { start, end: hour + 1 };
    }
    
    // Клик внутри диапазона - сброс на 1 час
    return { start: hour, end: hour + 1 };
  },
  target: $selectedTimeRange,
});

// ... (код выше остается без изменений)

// ===== ИСПРАВЛЕННЫЕ SAMPLES =====

// 1. Создание брони: берем текущий массив ($bookings) и добавляем новый элемент
sample({
  clock: createBooking,
  source: $bookings, // <-- Получаем текущее состояние массива
  fn: (currentBookings, data) => {
    const newBooking: Booking = {
      id: Date.now(),
      ...data,
      userId: 1, // В реальном приложении брать из $user
      userName: 'Анна Аналитик',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      roomName: ''
    };
    // Возвращаем НОВЫЙ массив (старый + новый элемент)
    return [...currentBookings, newBooking];
  },
  target: $bookings, // <-- Теперь типы совпадают: Booking[] -> Booking[]
});

// 2. Удаление брони: фильтруем массив, убирая удаленный элемент
sample({
  clock: deleteBooking,
  source: $bookings,
  fn: (currentBookings, idToDelete) => {
    return currentBookings.map((b) => 
      b.id === idToDelete ? { ...b, status: 'cancelled' as const } : b
    );
  },
  target: $bookings,
});

// 3. Уведомление об успехе
sample({
  clock: createBooking, // Триггер - событие создания
  fn: () => ({ type: 'success' as const, message: 'Бронирование создано!' }),
  target: $notification,
});

// 4. Авто-скрытие уведомления
sample({
  clock: $notification,
  fn: () => null,
  target: $notification,
  delay: 3000,
});