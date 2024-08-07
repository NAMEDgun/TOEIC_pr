import React, { useState } from "react";
import "../styles/QuizFilter.css"; // QuizFilter 컴포넌트의 CSS 파일을 import

const QuizFilter = ({
  filters,
  selectedFilters,
  setSelectedFilters,
  errorMessage,
}) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilterChange = (filter) => {
    if (selectedDate) {
      setSelectedFilters([filter]);
    } else {
      errorMessage("날짜를 먼저 선택해 주세요");
    }
  };

  const handleDateChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue) {
      setSelectedDate(selectedValue);
      setSelectedFilters((prevFilters) => {
        if (!prevFilters.includes("date")) {
          return [...prevFilters, "date"];
        }
        return prevFilters;
      });

      // 선택된 날짜를 백엔드로 전송
      sendSelectedDateToBackend(selectedValue);
    } else {
      setSelectedDate("");
      setSelectedFilters([]);
    }
  };

  const sendSelectedDateToBackend = (date) => {
    // 예시: fetch를 사용하여 백엔드에 POST 요청
    fetch('https://your-backend-api.com/selected-date', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // filters.days가 정의되지 않았거나 길이가 0인 경우 처리
  if (!filters.days || filters.days.length === 0) {
    return <div>Loading...</div>; // 또는 로딩 상태를 처리하는 UI 표시
  }

  return (
    <div className="quiz-filter-container">
      <h3 className="quiz-filter-title">날짜와 응시할 방법을 선택하세요</h3>
      <div className="quiz-filter-select">
        <label htmlFor="date">시험 날짜: </label>
        <select
          id="date"
          onChange={handleDateChange}
          value={selectedDate}
        >
          <option value="">날짜 선택</option>
          {/* filters.days에서 각 옵션을 순회하며 동적으로 생성 */}
          {filters.days.map((day) => (
            <option key={day} value={day}>
              DAY {day}
            </option>
          ))}
        </select>
      </div>
      <div className="quiz-filter-options">
        <div className="quiz-filter-radio">
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
        <div className="quiz-filter-radio">
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
        <div className="quiz-filter-radio">
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
    </div>
  );
};

export default QuizFilter;
