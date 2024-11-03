import React from 'react';
import { User, Key, Clock } from 'lucide-react';
import type { Guest } from '../types';

interface GuestListProps {
  guests: Guest[];
  onCheckIn: (guest: Partial<Guest>) => void;
  onCheckOut: (guestId: string) => void;
}

export function GuestList({ guests, onCheckIn, onCheckOut }: GuestListProps) {
  const [showAddGuest, setShowAddGuest] = React.useState(false);
  const [newGuest, setNewGuest] = React.useState<Partial<Guest>>({
    name: '',
    document: '',
    room: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckIn(newGuest);
    setShowAddGuest(false);
    setNewGuest({ name: '', document: '', room: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-600" />
          Hóspedes Ativos
        </h2>
        <button
          onClick={() => setShowAddGuest(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Novo Check-in
        </button>
      </div>

      {showAddGuest && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome do Hóspede"
              value={newGuest.name}
              onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              placeholder="Documento"
              value={newGuest.document}
              onChange={(e) => setNewGuest({ ...newGuest, document: e.target.value })}
              className="border rounded-md p-2"
              required
            />
            <input
              type="text"
              placeholder="Número do Quarto"
              value={newGuest.room}
              onChange={(e) => setNewGuest({ ...newGuest, room: e.target.value })}
              className="border rounded-md p-2"
              required
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddGuest(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Confirmar Check-in
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">Hóspede</th>
              <th className="text-left py-3 px-4">Quarto</th>
              <th className="text-left py-3 px-4">Check-in</th>
              <th className="text-left py-3 px-4">Status Chave</th>
              <th className="text-left py-3 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-gray-800">{guest.name}</div>
                    <div className="text-sm text-gray-500">{guest.document}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-800">{guest.room}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    {new Date(guest.checkIn).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Key className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Com o hóspede</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onCheckOut(guest.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Check-out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}