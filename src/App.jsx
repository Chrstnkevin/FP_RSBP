import React, { useState } from "react";
import DiagramForm from "./components/DiagramForm";
import GeneratedDiagram from "./components/GeneratedDiagram";

const App = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <h1>BPMN Diagram Generator</h1>
      <DiagramForm onDiagramGenerated={setImageUrl} />
      <GeneratedDiagram imageUrl={imageUrl} />
    </div>
  );
};

export default App;
