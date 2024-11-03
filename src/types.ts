export interface Guest {
  id: string;
  name: string;
  document: string;
  room: string;
  checkIn: string;
  checkOut: string | null;
}

export interface KeyMovement {
  id: string;
  guestId: string;
  guestName: string;
  room: string;
  type: 'checkout' | 'checkin' | 'temporary';
  status: 'taken' | 'returned';
  takenAt: string;
  returnedAt: string | null;
}

export interface Room {
  number: string;
  status: 'available' | 'occupied' | 'maintenance';
  currentGuestId: string | null;
  keyStatus: 'available' | 'with-guest' | 'with-staff';
}