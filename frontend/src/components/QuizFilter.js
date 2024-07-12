import React from "react";
import "../styles/QuizFilter.module.css";

const QuizFilter = ({
  filters,
  selectedFilters,
  setSelectedFilters,
  errorMessage,
}) => {
  const handleFilterChange = (filter) => {
    if (selectedFilters.includes("date")) {
      setSelectedFilters([filter]);
    } else {
      // 날짜를 먼저 선택하라는 오류 메시지 반환
      errorMessage("날짜를 먼저 선택해 주세요");
    }
  };

  return (
    <div>
      <h3 className="quiz">날짜와 응시할 방법을 선택하세요</h3>
      <div>
        <label htmlFor="date">시험 날짜: </label>
        <select id="date" onChange={(e) => setSelectedFilters(["date"])}>
          <option value="">날짜 선택</option>
          {/* 여기서 날짜 옵션들을 동적으로 생성 */}
          {filters.dateOptions.map((option) => (
            <option key={option} value={option}>
              {option}
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
          checked={selectedFilters.includes("eng")}
          onChange={() => handleFilterChange("eng")}
        />
        <label htmlFor="eng">ENG</label>
      </div>
      <div>
        <input
          type="radio"
          id="kor"
          name="quizFilter"
          value="kor"
          checked={selectedFilters.includes("kor")}
          onChange={() => handleFilterChange("kor")}
        />
        <label htmlFor="kor">KOR</label>
      </div>
      <div>
        <input
          type="radio"
          id="mix"
          name="quizFilter"
          value="mix"
          checked={selectedFilters.includes("mix")}
          onChange={() => handleFilterChange("mix")}
        />
        <label htmlFor="mix">MIX</label>
      </div>
    </div>
  );
};

export default QuizFilter;
