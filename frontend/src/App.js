import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [filters, setFilters] = useState({
    dateOptions: [],
    otherOptions: ["eng", "kor", "mix"], // 이후 DB에서 받아올 필터링 옵션들
  });

  // DB에서 필터링 옵션들을 받아오는 가정
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get("/");
        const data = response.data;
        setFilters({
          dateOptions: data.dateOptions,
          otherOptions: data.otherOptions,
        });
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000); // 3초 후 오류 메시지 자동으로 사라짐
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                filters={filters}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                errorMessage={handleErrorMessage}
              />
            }
          />
          <Route
            path="/solve-quiz"
            element={
              <SolveQuiz filters={filters} selectedFilters={selectedFilters} />
            }
          />
        </Routes>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </Router>
  );
};

const Home = ({
  filters,
  selectedFilters,
  setSelectedFilters,
  errorMessage,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>토익 영단어 단어장</h1>
      <QuizFilter
        filters={filters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        errorMessage={errorMessage}
      />
      <button onClick={() => navigate("/solve-quiz")}>시험 시작</button>
    </div>
  );
};

export default App;
