import React from 'react';
import { Key, AlertCircle } from 'lucide-react';
import type { Room } from '../types';

interface RoomGridProps {
  rooms: Room[];
  onRoomClick: (room: Room) => void;
}

export function RoomGrid({ rooms, onRoomClick }: RoomGridProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Key className="h-5 w-5 text-indigo-600" />
        Status dos Quartos
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {rooms.map((room) => (
          <button
            key={room.number}
            onClick={() => onRoomClick(room)}
            className={`p-4 rounded-lg text-center transition-all ${
              room.status === 'available'
                ? 'bg-green-100 hover:bg-green-200'
                : room.status === 'occupied'
                ? 'bg-red-100 hover:bg-red-200'
                : 'bg-yellow-100 hover:bg-yellow-200'
            }`}
          >
            <div className="text-2xl font-bold mb-2">{room.number}</div>
            <div className="flex items-center justify-center gap-1 text-sm">
              {room.status === 'maintenance' && (
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              )}
              <span
                className={
                  room.status === 'available'
                    ? 'text-green-700'
                    : room.status === 'occupied'
                    ? 'text-red-700'
                    : 'text-yellow-700'
                }
              >
                {room.status === 'available'
                  ? 'Disponível'
                  : room.status === 'occupied'
                  ? 'Ocupado'
                  : 'Manutenção'}
              </span>
            </div>
            <div
              className={`text-xs mt-1 ${
                room.keyStatus === 'available'
                  ? 'text-green-600'
                  : room.keyStatus === 'with-guest'
                  ? 'text-blue-600'
                  : 'text-orange-600'
              }`}
            >
              Chave: {room.keyStatus === 'available' ? 'Na recepção' : 'Com hóspede'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}