
import React, { useState, useEffect, useRef } from 'react';
import { TableMode, Question, QuizResult } from '../types';
import { X, CheckCircle, ArrowRight, Timer } from 'lucide-react';

interface QuizProps {
  mode: TableMode;
  onFinish: (result: QuizResult) => void;
  onCancel: () => void;
}

const Quiz: React.FC<QuizProps> = ({ mode, onFinish, onCancel }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate questions on mount
  useEffect(() => {
    const generateQuestions = () => {
      let pool: Question[] = [];
      // Updated: limit to 10x for Table of 2
      if (mode === TableMode.TWO || mode === TableMode.MIXED) {
        for (let i = 1; i <= 10; i++) {
          pool.push({ id: Math.random(), multiplier: i, table: 2, answer: i * 2 });
        }
      }
      // Updated: limit to 10x for Table of 5
      if (mode === TableMode.FIVE || mode === TableMode.MIXED) {
        for (let i = 1; i <= 10; i++) {
          pool.push({ id: Math.random(), multiplier: i, table: 5, answer: i * 5 });
        }
      }
      
      // Shuffle and pick 10 (or all if pool is smaller)
      return pool.sort(() => Math.random() - 0.5).slice(0, 10);
    };

    setQuestions(generateQuestions());
  }, [mode]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback?.show || !userInput) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = parseInt(userInput) === currentQuestion.answer;
    
    if (isCorrect) setScore(s => s + 1);
    
    setFeedback({ isCorrect, show: true });

    setTimeout(() => {
      setFeedback(null);
      setUserInput('');
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        onFinish({
          score: isCorrect ? score + 1 : score,
          total: questions.length,
          timeSpent,
          mode
        });
      }
    }, 1000);
  };

  if (questions.length === 0) return <div className="p-10 text-center">Laden...</div>;

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onCancel} className="text-gray-400 hover:text-red-500 transition-colors">
          <X className="w-8 h-8" />
        </button>
        <div className="flex-1 mx-8 h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-lg font-bold text-gray-700">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="text-6xl font-black text-gray-800 mb-10 flex items-center gap-4">
          <span>{currentQ.multiplier}</span>
          <span className="text-blue-500">×</span>
          <span>{currentQ.table}</span>
          <span className="text-gray-300">=</span>
          <span className="text-blue-600 underline decoration-blue-200">?</span>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-xs relative">
          <input
            ref={inputRef}
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={feedback?.show}
            className={`w-full p-4 text-4xl text-center border-4 rounded-2xl focus:outline-none transition-all ${
              feedback?.show 
                ? feedback.isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
                : 'border-blue-200 focus:border-blue-500'
            }`}
            placeholder="..."
          />
          {feedback?.show && (
            <div className="absolute -right-12 top-1/2 -translate-y-1/2">
              {feedback.isCorrect ? (
                <CheckCircle className="text-green-500 w-10 h-10 animate-ping" />
              ) : (
                <div className="text-red-500 font-bold text-2xl">!</div>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            Antwoord geven <ArrowRight />
          </button>
        </form>
      </div>

      <div className="mt-12 flex justify-center text-gray-400 gap-2 items-center">
        <Timer className="w-4 h-4" />
        <span className="text-sm font-mono">Tijd loopt...</span>
      </div>
    </div>
  );
};

export default Quiz;
