import React, { useState, useEffect } from "react";

export default function QuestionForm({ formData, onSubmitAnswer }) {
  const [questionData, setQuestionData] = useState(null);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (!formData.category || !formData.difficulty) {
      console.log("⛔ Incomplete formData:", formData);
      return;
    }

    const fetchQuestion = async () => {
      const baseURL = "https://opentdb.com/api.php";
      const queryParams = new URLSearchParams({
        amount: 1,
        category: formData.category,
        difficulty: formData.difficulty,
        type: "multiple",
        encode: "url3986"
      });

      const fullURL = `${baseURL}?${queryParams.toString()}`;
      const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(fullURL)}`;

      console.log("🚀 Fetching from:", proxyURL);

      try {
        const res = await fetch(proxyURL);
        const data = await res.json();
        const parsed = JSON.parse(data.contents);

        if (!parsed.results || parsed.results.length === 0) {
          setApiError("No trivia found. Try tweaking your settings.");
          return;
        }

        const [question] = parsed.results;
        const allAnswers = [...question.incorrect_answers, question.correct_answer];
        const shuffled = allAnswers.sort(() => Math.random() - 0.5);

        setQuestionData({
          question: decodeURIComponent(question.question),
          correct: decodeURIComponent(question.correct_answer),
          answers: shuffled.map(ans => decodeURIComponent(ans))
        });

        console.log("✅ Question loaded:", question);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setApiError("Trivia couldn't load. The server might be cranky.");
      }
    };

    fetchQuestion();
  }, [formData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!selected) {
      setError("Please select an answer.");
    } else {
      onSubmitAnswer(selected, questionData.correct);
      setError("");
    }
  };

  if (apiError)
    return (
      <div className="question-form">
        <p className="error">{apiError}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  if (!questionData)
    return <p>🧠 Loading trivia magic…</p>;

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h2>{questionData.question}</h2>
      {questionData.answers.map((answer, i) => (
        <label key={i} className="radio-option">
          <input
            type="radio"
            name="answer"
            value={answer}
            checked={selected === answer}
            onChange={e => setSelected(e.target.value)}
          />
          <span>{answer}</span>
        </label>
      ))}
      <button type="submit">Submit Answer</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}