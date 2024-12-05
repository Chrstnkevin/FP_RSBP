import React, { useState } from "react";
import axios from "axios";

const DiagramForm = ({ onDiagramGenerated }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ganti URL di bawah dengan endpoint API Anda
      const response = await axios.post("https://d9fe-34-19-81-213.ngrok-free.app", {
        process_description: description,
      });

      // Kirim URL gambar ke komponen utama
      onDiagramGenerated(response.data.image_path);
    } catch (error) {
      console.error("Error generating diagram:", error);
      alert("Failed to generate diagram.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description">Enter Process Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Diagram"}
      </button>
    </form>
  );
};

export default DiagramForm;
