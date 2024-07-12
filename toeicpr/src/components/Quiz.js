import React, { useState } from "react";

const Quiz = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const handleNext = () => {
    setShowDefinition(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  return (
    <div>
      <h2>Quiz</h2>
      {words.length > 0 ? (
        <div>
          <p>{words[currentIndex].word}</p>
          {showDefinition && <p>{words[currentIndex].definition}</p>}
          <button onClick={() => setShowDefinition(!showDefinition)}>
            {showDefinition ? "Hide Definition" : "Show Definition"}
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <p>No words available for the quiz.</p>
      )}
    </div>
  );
};

export default Quiz;
