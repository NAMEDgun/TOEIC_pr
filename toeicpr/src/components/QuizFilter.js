import React from "react";

const QuizFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <h2>Filter Quiz</h2>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="eng">English</option>
        <option value="kor">Korean</option>
        <option value="mix">Mixed</option>
      </select>
    </div>
  );
};

export default QuizFilter;
