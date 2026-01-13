
import React, { useState, useEffect } from 'react';
import { QuizResult } from '../types';
import { getFeedback, getMathFact } from '../services/geminiService';
import { Trophy, RefreshCw, MessageSquare, BookOpen } from 'lucide-react';

interface ResultsProps {
  result: QuizResult;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {
  const [aiFeedback, setAiFeedback] = useState<string>('De AI-coach denkt na...');
  const [fact, setFact] = useState<string | null>(null);

  useEffect(() => {
    const fetchAI = async () => {
      const fb = await getFeedback(result.score, result.total, result.mode);
      setAiFeedback(fb);
      
      // Get a fact about the score or a related number
      const mathFact = await getMathFact(result.score * 10);
      setFact(mathFact);
    };
    fetchAI();
  }, [result]);

  const percentage = (result.score / result.total) * 100;
  const isPerfect = result.score === result.total;

  return (
    <div className="p-8">
      <div className="flex flex-col items-center mb-8">
        <div className={`p-6 rounded-full mb-4 ${isPerfect ? 'bg-yellow-100 animate-bounce' : 'bg-blue-100'}`}>
          <Trophy className={`w-16 h-16 ${isPerfect ? 'text-yellow-600' : 'text-blue-600'}`} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Klaar!</h2>
        <div className="mt-4 text-center">
          <div className="text-5xl font-black text-blue-600 mb-1">
            {result.score} <span className="text-gray-300 text-3xl">/ {result.total}</span>
          </div>
          <p className="text-gray-500">Je hebt er {Math.floor(percentage)}% goed!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <div className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Tijd</div>
          <div className="text-2xl font-bold text-gray-700">{result.timeSpent} sec</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
          <div className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Snelheid</div>
          <div className="text-2xl font-bold text-gray-700">
            {(result.timeSpent / result.total).toFixed(1)} s/v
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-blue-50 rounded-2xl border-l-8 border-blue-400">
          <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold">
            <MessageSquare className="w-5 h-5" /> AI Coach zegt:
          </div>
          <p className="text-blue-900 leading-relaxed italic">
            "{aiFeedback}"
          </p>
        </div>

        {fact && (
          <div className="p-6 bg-purple-50 rounded-2xl border-l-8 border-purple-400">
            <div className="flex items-center gap-2 mb-2 text-purple-800 font-bold">
              <BookOpen className="w-5 h-5" /> Wist je dat?
            </div>
            <p className="text-purple-900 leading-relaxed text-sm">
              {fact}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onRestart}
        className="w-full mt-10 py-4 bg-gray-800 hover:bg-black text-white rounded-xl font-bold text-xl flex items-center justify-center gap-3 transition-all transform active:scale-95"
      >
        <RefreshCw className="w-6 h-6" /> Nog een keer oefenen
      </button>
    </div>
  );
};

export default Results;
