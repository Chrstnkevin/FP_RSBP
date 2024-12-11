import React, { useState } from "react";
import DiagramForm from "./components/DiagramForm";
import GeneratedDiagram from "./components/GeneratedDiagram";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <DiagramForm onDiagramGenerated={setImageUrl} />
      <GeneratedDiagram imageUrl={imageUrl} />
    </div>
  );
};

export default App;
