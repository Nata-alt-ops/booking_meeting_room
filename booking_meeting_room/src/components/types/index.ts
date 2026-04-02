export type UserRole = 'analyst' | 'employee';

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface Room {
  id: number;
  roomNumber: string;
  name: string;
  capacity: number;
  equipment: string[];
  image: string;
}

export interface Booking {
  id: number;
  roomId: number;
  roomName: string;
  userId: number;
  userName: string;
  date: string;
  startTime: number;
  endTime: number;
  topic: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface TimeSlot {
  hour: number;
  isBooked: boolean;
  isSelected: boolean;
  booking?: Booking;
}

export interface TimeRange {
  start: number | null;
  end: number | null;
}