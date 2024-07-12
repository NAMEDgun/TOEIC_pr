import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import QuizFilter from "./components/QuizFilter";
import SolveQuiz from "./components/SolveQuiz";
import "./styles/global.css";

const App = () => {
  const [filter, setFilter] = useState("mix");
  const [selectedDay, setSelectedDay] = useState("DAY1"); // 선택된 날짜 상태 추가
  const words = [
    { eng: "apple", kor: "사과" },
    { eng: "banana", kor: "바나나" },
    { eng: "cherry", kor: "체리" },
    // 추가 단어들...
  ];

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                filter={filter}
                setFilter={setFilter}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            }
          />
          <Route
            path="/solve-quiz"
            element={
              <SolveQuiz
                words={words}
                filter={filter}
                selectedDay={selectedDay}
              />
            } // SolveQuiz에도 선택된 날짜 전달
          />
        </Routes>
      </div>
    </Router>
  );
};

const Home = ({ filter, setFilter, selectedDay, setSelectedDay }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>토익 영단어 단어장</h1>
      <QuizFilter
        filter={filter}
        setFilter={setFilter}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <button onClick={() => navigate("/solve-quiz")}>시험 시작</button>
    </div>
  );
};

export default App;
