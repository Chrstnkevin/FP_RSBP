import React from "react";

const GeneratedDiagram = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <div>
      <h3>Generated Diagram</h3>
      <img src={imageUrl} alt="Generated BPMN Diagram" style={{ maxWidth: "100%" }} />
    </div>
  );
};

export default GeneratedDiagram;
