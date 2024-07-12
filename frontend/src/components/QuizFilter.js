import React from "react";
import "../styles/QuizFilter.module.css";

const QuizFilter = ({
  filter,
  setFilter,
  date,
  setDate,
  selectedDay,
  setSelectedDay,
}) => {
  const days = Array.from({ length: 15 }, (_, index) => `DAY${index + 1}`);

  return (
    <div>
      <h3 className="quiz">날짜와 응시할 방법을 선택하세요</h3>
      <div>
        <label htmlFor="date">시험 날짜: </label>
        <select
          id="date"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <div className="quiz">
        <input
          type="radio"
          id="eng"
          name="quizFilter"
          value="eng"
          checked={filter === "eng"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label htmlFor="eng">ENG</label>
      </div>
      <div>
        <input
          type="radio"
          id="kor"
          name="quizFilter"
          value="kor"
          checked={filter === "kor"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label htmlFor="kor">KOR</label>
      </div>
      <div>
        <input
          type="radio"
          id="mix"
          name="quizFilter"
          value="mix"
          checked={filter === "mix"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label htmlFor="mix">MIX</label>
      </div>
    </div>
  );
};

export default QuizFilter;
