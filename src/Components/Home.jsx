import React, { useState } from "react";

const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 23, name: "History" },
  { id: 17, name: "Science & Nature" },
  { id: 11, name: "Film" },
];

export default function Home({ onStart }) {
  const [formData, setFormData] = useState({ name: "", category: "", difficulty: "" });
  const [error, setError] = useState("");

  const handleChange = e => {
    console.log("✏️ Updating field:", e.target.name, "→", e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("📩 Submitted formData:", formData);
    if (!formData.name || !formData.category || !formData.difficulty) {
      setError("All fields are required.");
    } else {
      setError("");
      onStart({
        name: formData.name.trim(),
        category: parseInt(formData.category),
        difficulty: formData.difficulty
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="home-form">
      <h1>🧠 Trivia Quiz App</h1>
      <p className="instructions">
        Enter your name, select a category and difficulty, and let’s test your trivia skills!
      </p>

      <label>Name:</label>
      <input name="name" value={formData.name} onChange={handleChange} />

      <label>Category:</label>
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select a Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <label>Difficulty:</label>
      <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
        <option value="">Select Difficulty</option>
        {["easy", "medium", "hard"].map(level => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>

      <button type="submit">Start Quiz</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}