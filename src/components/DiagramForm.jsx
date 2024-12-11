import React, { useState } from "react";
import axios from "axios";

const DiagramForm = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(null); // URL untuk gambar hasil diagram

  // Base URL for the API
  const API_BASE_URL = "https://5813-34-23-173-35.ngrok-free.app"; // Update dengan URL backend Anda

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setImageUrl(null); // Reset URL gambar sebelum permintaan baru

    try {
      // Kirim POST request ke /generate-diagram/
      const response = await axios.post(`${API_BASE_URL}/generate-diagram/`, {
        process_description: description,
      });

      // Gabungkan BASE_URL dengan endpoint /get-diagram/
      if (response.data && response.data.image_path) {
        setImageUrl(`${API_BASE_URL}${response.data.image_path}`);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      console.error("Error generating diagram:", error);
      setErrorMessage(
        error.response?.data?.error || // Error dari backend
        error.message || // Error dari axios
        "Failed to generate diagram. Please try again."
      );
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#121212",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Generate BPMN Diagram
      </h1>
      <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
        Untuk Memenuhi Tugas FP RSBP Kelompok 6
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <input
          type="text"
          id="description"
          placeholder="Masukkan deskripsi BPMN diagram"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #333",
            marginBottom: "10px",
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
            marginBottom: "20px",
          }}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {errorMessage && (
        <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
      )}
      {imageUrl && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h2>Generated Diagram:</h2>
          <img
            src={imageUrl}
            alt="Generated BPMN Diagram"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              borderRadius: "8px",
              border: "1px solid #6a5acd",
              marginTop: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DiagramForm;
