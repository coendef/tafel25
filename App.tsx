
import React, { useState, useEffect } from 'react';
import { TableMode, QuizResult } from './types';
import Lobby from './components/Lobby';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { Trophy, Calculator, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'lobby' | 'quiz' | 'results'>('lobby');
  const [selectedMode, setSelectedMode] = useState<TableMode>(TableMode.TWO);
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  const startQuiz = (mode: TableMode) => {
    setSelectedMode(mode);
    setView('quiz');
  };

  const finishQuiz = (result: QuizResult) => {
    setLastResult(result);
    setView('results');
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Calculator className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-800">Tafel Trainer</h1>
        </div>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <GraduationCap className="w-5 h-5" /> Word een meester in de tafels van 2 en 5!
        </p>
      </header>

      <main className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {view === 'lobby' && <Lobby onStart={startQuiz} />}
        {view === 'quiz' && (
          <Quiz 
            mode={selectedMode} 
            onFinish={finishQuiz} 
            onCancel={() => setView('lobby')} 
          />
        )}
        {view === 'results' && lastResult && (
          <Results 
            result={lastResult} 
            onRestart={() => setView('lobby')} 
          />
        )}
      </main>

      <footer className="mt-12 text-gray-400 text-sm">
        Gemaakt om rekenen leuker te maken • Powered by Gemini AI
      </footer>
    </div>
  );
};

export default App;
