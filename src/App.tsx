import React from 'react';
import { Header } from './components/Header';
import { GuestList } from './components/GuestList';
import { KeyMovementHistory } from './components/KeyMovementHistory';
import { RoomGrid } from './components/RoomGrid';
import type { Guest, KeyMovement, Room } from './types';

function App() {
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'guests' | 'keys' | 'history'>('dashboard');
  const [guests, setGuests] = React.useState<Guest[]>([
    {
      id: '1',
      name: 'João Silva',
      document: '123.456.789-00',
      room: '101',
      checkIn: '2024-03-10T14:00:00',
      checkOut: null,
    },
  ]);

  const [movements, setMovements] = React.useState<KeyMovement[]>([
    {
      id: '1',
      guestId: '1',
      guestName: 'João Silva',
      room: '101',
      type: 'checkin',
      status: 'taken',
      takenAt: '2024-03-10T14:00:00',
      returnedAt: null,
    },
  ]);

  const [rooms, setRooms] = React.useState<Room[]>([
    {
      number: '101',
      status: 'occupied',
      currentGuestId: '1',
      keyStatus: 'with-guest',
    },
    {
      number: '102',
      status: 'available',
      currentGuestId: null,
      keyStatus: 'available',
    },
    {
      number: '103',
      status: 'maintenance',
      currentGuestId: null,
      keyStatus: 'with-staff',
    },
  ]);

  const handleCheckIn = (newGuest: Partial<Guest>) => {
    const guestId = Date.now().toString();
    const checkInTime = new Date().toISOString();
    
    const guest: Guest = {
      id: guestId,
      name: newGuest.name!,
      document: newGuest.document!,
      room: newGuest.room!,
      checkIn: checkInTime,
      checkOut: null,
    };

    const movement: KeyMovement = {
      id: Date.now().toString(),
      guestId,
      guestName: guest.name,
      room: guest.room,
      type: 'checkin',
      status: 'taken',
      takenAt: checkInTime,
      returnedAt: null,
    };

    setGuests([...guests, guest]);
    setMovements([...movements, movement]);
    setRooms(
      rooms.map((room) =>
        room.number === guest.room
          ? { ...room, status: 'occupied', currentGuestId: guestId, keyStatus: 'with-guest' }
          : room
      )
    );
  };

  const handleCheckOut = (guestId: string) => {
    const checkOutTime = new Date().toISOString();
    
    setGuests(
      guests.map((guest) =>
        guest.id === guestId ? { ...guest, checkOut: checkOutTime } : guest
      )
    );

    const guest = guests.find((g) => g.id === guestId)!;
    
    const movement: KeyMovement = {
      id: Date.now().toString(),
      guestId,
      guestName: guest.name,
      room: guest.room,
      type: 'checkout',
      status: 'returned',
      takenAt: checkOutTime,
      returnedAt: checkOutTime,
    };

    setMovements([...movements, movement]);
    setRooms(
      rooms.map((room) =>
        room.number === guest.room
          ? { ...room, status: 'available', currentGuestId: null, keyStatus: 'available' }
          : room
      )
    );
  };

  const handleDataImport = (data: { guests: Guest[]; movements: KeyMovement[]; rooms: Room[] }) => {
    setGuests(data.guests);
    setMovements(data.movements);
    setRooms(data.rooms);
  };

  const handleRoomClick = (room: Room) => {
    console.log('Room clicked:', room);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <RoomGrid rooms={rooms} onRoomClick={handleRoomClick} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <GuestList
                guests={guests.filter((g) => !g.checkOut)}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
              />
              <KeyMovementHistory movements={movements} />
            </div>
          </>
        );
      case 'guests':
        return (
          <GuestList
            guests={guests.filter((g) => !g.checkOut)}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        );
      case 'keys':
        return <RoomGrid rooms={rooms} onRoomClick={handleRoomClick} />;
      case 'history':
        return <KeyMovementHistory movements={movements} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView}
        onDataImport={handleDataImport}
        appData={{ guests, movements, rooms }}
      />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;