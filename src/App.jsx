import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [generatedImg, setGeneratedImg] = useState("");

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  const handleGene = async () => {
    await query({ inputs: userInput })
      .then((response) => {
        const imgSrc = URL.createObjectURL(response);
        setGeneratedImg(imgSrc);
        console.log("imgsrc", imgSrc);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h2>Text To Image Generator</h2>
      <input
        type="text"
        placeholder="type for images"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={handleGene}>Create</button>
      <div className="result">
        <img src={generatedImg} alt="" />
      </div>
    </>
  );
}

export default App;
