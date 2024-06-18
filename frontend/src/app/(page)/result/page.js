"use client";
import React, { useState } from "react";
import { useDataContext } from "../../utility/dataContext";
import { parseSentence } from "../../utility/algorithm";
import config from "../../json/config.json";

export default function Result() {
  const [result, setResult] = useState(null);
  const [imageData, setImageData] = useState('');
  let { patterns } = useDataContext() || { patterns: [] };

  // Filter patterns if needed
  patterns = patterns.filter((pattern) => !pattern.isBlacklisted);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputText = e.target[0].value;
    const parseResult = parseSentence(inputText, patterns);
    setResult(parseResult);

    if (!parseResult.isValid || config.disableGenerateFA) {
      setImageData('');
      return;
    }

    // Make a request to the Flask API to generate the image
    try {
      const response = await fetch('/api/fetchImageFA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence: inputText, structure: parseResult.structure }),
      });

      const data = await response.json();
      if (data.image) {
        setImageData(data.image);
      } else {
        alert('Failed to generate image');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      alert('Error fetching image');
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 w-full"
        >
          <input
            type="text"
            name="input_text"
            className="border-2 border-gray-400 dark:border-gray-700 rounded-md p-2 w-full text-black"
            placeholder="Input kalimat"
          />
          <button
            type="submit"
            className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center w-full sm:max-w-20"
          >
            Check
          </button>
        </form>
      </div>
      {result && (
        <div className="border dark:border-2 border-gray-400 dark:border-gray-700 w-full rounded-lg p-5">
          <p className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700">
            RESULT
          </p>
          <div className="my-3">
            <>
              Kalimat: {result.sentence} <br />
              Struktur: {result.structure.join(" - ")} <br />
              Valid: {result.isValid ? "YA" : "TIDAK"} <br />
              <br />
              <h1 className="font-extrabold">LOGS:</h1>
              <ul>
                {result.logs.map((log, index) => (
                  <React.Fragment key={index}>
                    <li>{log}</li>
                    {log.includes("Isi stack") && <br />}
                  </React.Fragment>
                ))}
              </ul>
            </>
          </div>
          {imageData && (
            <div className="my-3">
              <h2 className="text-xl font-semibold">DIAGRAM FINITE AUTOMATA:</h2>
              <img src={imageData} alt="Finite Automaton" />
            </div>
          )}
        </div>
      )}
      {!result && (
        <div className="text-center mt-8">
          Input kalimat sesuai pattern!
          <br />
          [ Hasil akan muncul disini ]
        </div>
      )}
    </>
  );
}
