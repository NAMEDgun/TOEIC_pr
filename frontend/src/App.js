import React, { useState } from "react";
import QuizFilter from "./components/QuizFilter";
import SolveQuiz from "./components/SolveQuiz";
import "./styles.css";

const App = () => {
  const [filter, setFilter] = useState("eng");
  const words = [
    { eng: "apple", kor: "사과" },
    { eng: "banana", kor: "바나나" },
    { eng: "cherry", kor: "체리" },
    // 추가 단어들...
  ];

  return (
    <div className="app">
      <h1>Vocabulary Quiz</h1>
      <QuizFilter filter={filter} setFilter={setFilter} />
      <SolveQuiz words={words} filter={filter} />
    </div>
  );
};

export default App;
