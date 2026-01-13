
import React from 'react';
import { TableMode } from '../types';
import { Zap, Target, Shuffle } from 'lucide-react';

interface LobbyProps {
  onStart: (mode: TableMode) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onStart }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700">Kies je uitdaging</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => onStart(TableMode.TWO)}
          className="group flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-2xl transition-all hover:scale-105"
        >
          <div className="p-4 bg-blue-500 rounded-full mb-4 group-hover:animate-bounce">
            <Zap className="text-white w-8 h-8" />
          </div>
          <span className="text-xl font-bold text-blue-800">Tafel van 2</span>
          <span className="text-sm text-blue-600 mt-2">1 x 2 t/m 10 x 2</span>
        </button>

        <button
          onClick={() => onStart(TableMode.FIVE)}
          className="group flex flex-col items-center p-6 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-2xl transition-all hover:scale-105"
        >
          <div className="p-4 bg-green-500 rounded-full mb-4 group-hover:animate-bounce">
            <Target className="text-white w-8 h-8" />
          </div>
          <span className="text-xl font-bold text-green-800">Tafel van 5</span>
          <span className="text-sm text-green-600 mt-2">1 x 5 t/m 10 x 5</span>
        </button>

        <button
          onClick={() => onStart(TableMode.MIXED)}
          className="group flex flex-col items-center p-6 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-2xl transition-all hover:scale-105"
        >
          <div className="p-4 bg-purple-500 rounded-full mb-4 group-hover:animate-bounce">
            <Shuffle className="text-white w-8 h-8" />
          </div>
          <span className="text-xl font-bold text-purple-800">Mix & Match</span>
          <span className="text-sm text-purple-600 mt-2">Beide tafels t/m 10</span>
        </button>
      </div>

      <div className="mt-10 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start gap-4">
        <span className="text-2xl">💡</span>
        <p className="text-sm text-yellow-800">
          <strong>Tip:</strong> Oefen elke dag een paar minuten. Herhaling is de sleutel tot succes!
        </p>
      </div>
    </div>
  );
};

export default Lobby;
