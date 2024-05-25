"use client";
import { useState } from "react";
import { useDataContext } from "../../utility/dataContext";
import { parseSentence } from "../../utility/algorithm";

export default function Result() {
  const [result, setResult] = useState(null);
  let { patterns } = useDataContext() || { patterns: [] };
  
  // Filter patterns if needed
  patterns = patterns.filter((pattern) => !pattern.isBlacklisted);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parseResult = parseSentence(e.target[0].value, patterns);
    setResult(parseResult);
  };

  return (
    <>
      <div className="flex flex-col">
        <form
          onSubmit={(e) => handleSubmit(e)}
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
      <div className="border dark:border-2 border-gray-400 dark:border-gray-700 w-full rounded-lg p-5">
        <p className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700">
          RESULT
        </p>
        <div className="my-3">
          {result && (
            <>
              Kalimat: {result.sentence} <br/>
              Struktur: {result.structure.join(" - ")} <br/>
              Valid: {result.isValid ? "ya" : "tidak"} valid <br/>
            </>
          )}
        </div>
      </div>
    </>
  );
}
