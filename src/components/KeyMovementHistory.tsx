import React from 'react';
import { History } from 'lucide-react';
import type { KeyMovement } from '../types';

interface KeyMovementHistoryProps {
  movements: KeyMovement[];
}

export function KeyMovementHistory({ movements }: KeyMovementHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <History className="h-5 w-5 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Histórico de Movimentação</h2>
      </div>

      <div className="space-y-4">
        {movements.map((movement) => (
          <div
            key={movement.id}
            className="border-l-4 border-indigo-600 pl-4 py-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">
                  {movement.guestName} - Quarto {movement.room}
                </p>
                <p className="text-sm text-gray-600">
                  {movement.type === 'checkin' ? 'Check-in' : 
                   movement.type === 'checkout' ? 'Check-out' : 'Retirada Temporária'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">
                  {new Date(movement.takenAt).toLocaleString()}
                </p>
                {movement.returnedAt && (
                  <p className="text-sm text-green-600">
                    Devolvida: {new Date(movement.returnedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-1">
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  movement.status === 'returned'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {movement.status === 'returned' ? 'Devolvida' : 'Em uso'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}