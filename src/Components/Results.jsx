import React from "react";

export default function Results({ name, isCorrect, correctAnswer, onRestart }) {
  console.log("📊 Result - isCorrect:", isCorrect, "correctAnswer:", correctAnswer);
  return (
    <div className="results-section">
      <h2>
        {isCorrect
          ? `🎉 Well done, ${name}! That's correct!`
          : `😢 Sorry, ${name}. That wasn’t the right answer.`}
      </h2>

      {!isCorrect && correctAnswer && (
        <p>
          The correct answer was: <strong>{correctAnswer}</strong>
        </p>
      )}

      <button onClick={() => {
        console.log("🔁 Restarting from result screen");
        onRestart();
      }}>
        Try Another
      </button>
    </div>
  );
}