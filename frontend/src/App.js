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
    days: [],
    otherOptions: ["eng", "kor", "mix"],
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axios.get("http://localhost:8000/");
        const data = response.data;
        setFilters({
          days: data.days,
          otherOptions: data.otherOptions,
        });
      } catch (error) {
        console.error("Error fetching filters:", error);
        if (error.response) {
          handleErrorMessage(`서버 오류: ${error.response.status}`);
        } else if (error.request) {
          handleErrorMessage("서버 응답 없음");
        } else {
          handleErrorMessage("네트워크 오류");
        }
      }
    };

    fetchFilters();
  }, []);

  const handleErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
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
