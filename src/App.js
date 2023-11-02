import { useState, useEffect } from 'react';
import Question from './components/Question';
import quizData from './data/quiz.json';
import Start from './components/Start'; 

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false); 

  let message;

  if(score <= 3) {
    message = "Better luck next time!";
  } else if(score <= 6) {
    message = "Good job!";  
  } else if(score <= 8) {
    message = "Great work!.";
  } else {
    message = "Outstanding!";
  }

  useEffect(() => {
    if(currentQuestion >= quizData.length) {
      setShowResults(true);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (!showResults) {
      setTimer(10); // Time per question
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            handleAnswer(); // Trigger next question
            return 10; // Reset for the next question
          } else {
            return prev - 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuestion]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setTimeTaken(time => time + (10 - timer)); 
  }
  
  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  }

  if (!quizData) return <p>Loading...</p>;

  return (
    <div className="bg-gray-900 h-screen">

      {!started && (
        <Start onStart={() => setStarted(true)} />
      )}

      {started && (
        // Here, wrap the elements in a parent div
        <div>
          <div className="fixed top-4 right-4 text-white text-xl">
            Score: {score}
          </div> 

          {showResults && (
            <div className="results text-white pt-20 max-w-md mx-auto">
              <h1 className="text-4xl font-bold text-center mb-6">
                Quiz Results
              </h1> 
              
              <p className="text-2xl text-center mb-4">
                Your score is <span className="font-bold">{score}</span> out of {quizData.length}
              </p>
              <p className="text-2xl text-center mb-4">
                Time taken: {timeTaken} seconds
              </p>
              <p className="text-2xl text-center">{message}</p>
              
              <button 
                className="bg-blue-500 text-white py-3 px-6 mt-8 rounded block mx-auto"
                onClick={restartQuiz}  
              >
                Restart Quiz
              </button>
            </div>
          )}

          {!showResults && (
            // Wrap the Question component in a parent div
            <div>
              <Question 
                data={quizData[currentQuestion]}
                questionNum={currentQuestion + 1}
                totalQuestions={quizData.length} 
                onAnswer={handleAnswer}
                timer={timer}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
