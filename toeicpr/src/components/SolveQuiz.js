import React, { useState } from "react";

const SolveQuiz = ({ words, filter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(null);

  const filteredWords = words.filter((word) => {
    if (filter === "eng") return word.eng;
    if (filter === "kor") return word.kor;
    return word.eng && word.kor;
  });

  const handleNext = () => {
    setAnswer("");
    setCorrect(null);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredWords.length);
  };

  const checkAnswer = () => {
    const currentWord = filteredWords[currentIndex];
    if (
      filter === "eng" &&
      answer.toLowerCase() === currentWord.eng.toLowerCase()
    ) {
      setCorrect(true);
    } else if (filter === "kor" && answer === currentWord.kor) {
      setCorrect(true);
    } else if (
      filter === "mix" &&
      (answer.toLowerCase() === currentWord.eng.toLowerCase() ||
        answer === currentWord.kor)
    ) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  if (filteredWords.length === 0) {
    return <p>No words available for the quiz.</p>;
  }

  const currentWord = filteredWords[currentIndex];

  return (
    <div>
      <h2>Solve Quiz</h2>
      {filter === "eng" && <p>{currentWord.kor}</p>}
      {filter === "kor" && <p>{currentWord.eng}</p>}
      {filter === "mix" && <p>{currentWord.eng}</p>}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer"
      />
      <button onClick={checkAnswer}>Check Answer</button>
      {correct !== null && (
        <p>{correct ? "Correct!" : "Incorrect, try again."}</p>
      )}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SolveQuiz;
