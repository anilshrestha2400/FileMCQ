import React, { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/questions.txt")
      .then((response) => response.text())
      .then((data) => {
        const lines = data.trim().split("\n");
        const qs = [];
        let currentQuestion = {};
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith("Question")) {
            if (currentQuestion.question) qs.push(currentQuestion);
            currentQuestion = {
              question: line.substring(line.indexOf(":") + 2),
            };
          } else if (line.startsWith("Answer")) {
            currentQuestion.answer = line.substring(line.indexOf(":") + 2);
          } else if (line.startsWith("A:")) {
            currentQuestion.options = [];
            currentQuestion.options.push(line.substring(line.indexOf(":") + 2));
          } else if (line.startsWith("B:")) {
            currentQuestion.options.push(line.substring(line.indexOf(":") + 2));
          } else if (line.startsWith("C:")) {
            currentQuestion.options.push(line.substring(line.indexOf(":") + 2));
          } else if (line.startsWith("D:")) {
            currentQuestion.options.push(line.substring(line.indexOf(":") + 2));
          }
        }
        if (currentQuestion.question) qs.push(currentQuestion);
        setQuestions(qs);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  console.log(selectedOption);
  const handleOptionChange = (event) => setSelectedOption(event.target.value);

  const handleNextClick = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (!questions.length) return <div>Loading questions...</div>;

  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h2>
          Your score: {score} out of {questions.length}
        </h2>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="ques">
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option, index) => (
        <div key={index} className="radio">
          <input
            type="radio"
            name="option"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
            required
          />
          <label>{option}</label>
        </div>
      ))}
      <div className="bookdiv">
        <button onClick={handleNextClick} className="bookbtn">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
