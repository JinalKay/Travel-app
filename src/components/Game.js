import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';


const Game = () => {
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
      setCountries(res.data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countries.length > 0) generateQuestion();
  }, [countries]);

  const generateQuestion = () => {
    const options = [];
    while (options.length < 4) {
      const random = countries[Math.floor(Math.random() * countries.length)];
      if (!options.find(o => o.name.common === random.name.common)) {
        options.push(random);
      }
    }
    const correct = options[Math.floor(Math.random() * 4)];
    setQuestion({ options, correct });
    setSelected(null);
  };

  const handleChoice = (choice) => {
    setSelected(choice);
    if (choice.name.common === question.correct.name.common) {
      setScore(score + 1);
    }
    setTimeout(generateQuestion, 1000);
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className="game">
      <h2>🎌 Guess the Country by Flag</h2>
      <img src={question.correct.flags.png} alt="Flag" className="flag-image" />
      <div className="choices">
        {question.options.map((c, i) => (
          <button
            key={i}
            className={`choice-btn ${
              selected
                ? c.name.common === question.correct.name.common
                  ? 'correct'
                  : c.name.common === selected.name.common
                  ? 'wrong'
                  : ''
                : ''
            }`}
            onClick={() => handleChoice(c)}
            disabled={!!selected}
          >
            {c.name.common}
          </button>
        ))}
      </div>
      <p className="score">🏆 Score: {score}</p>
    </div>
  );
};

export default Game;
