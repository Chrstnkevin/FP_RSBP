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
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#121212",
      color: "white",
      fontFamily: "Arial, sans-serif",
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Generate BPMN Diagram dengan Fitur Kami</h1>
      <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>Untuk Memenuhi Tugas FP RSBP Kelompok 6</p>
      <form 
        onSubmit={handleSubmit} 
        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "700px" }}>
        <input
          type="text"
          id="description"
          placeholder="Masukkan BPMN Diagram yang akan dibuat"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            flex: "1",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #333",
            marginRight: "10px",
            fontSize: "1rem",
            backgroundColor: "#1e1e1e",
            color: "white",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "1px solid #6a5acd",
            backgroundColor: loading ? "#444" : "#6a5acd",
            color: "white",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Sekarang"}
        </button>
      </form>
    </div>
  );
};

export default DiagramForm;
