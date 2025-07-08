import React, { useState } from "react";
import Home from "./Components/Home";
import QuestionForm from "./Components/QuestionForm";
import Results from "./Components/Results";
import "./App.css";

function App() {
  const [stage, setStage] = useState("home");
  const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const startQuiz = data => {
    console.log("🟢 Starting quiz with formData:", data);
    setFormData(data);
    setName(data.name);
    setStage("question");
  };

  const handleAnswerSubmit = (selected, correct) => {
    console.log("🟣 Submitted answer:", selected);
    console.log("✅ Correct answer:", correct);
    setIsCorrect(selected === correct);
    setCorrectAnswer(correct);
    setStage("result");
  };

  const restartQuiz = () => {
    console.log("🔄 Restarting quiz");
    setStage("home");
    setFormData({});
    setCorrectAnswer("");
    setIsCorrect(false);
  };

  return (
    <div className="App">
      {stage === "home" && <Home onStart={startQuiz} />}
      {stage === "question" && (
        <QuestionForm formData={formData} onSubmitAnswer={handleAnswerSubmit} />
      )}
      {stage === "result" && (
        <Results
          name={name}
          isCorrect={isCorrect}
          correctAnswer={correctAnswer}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;