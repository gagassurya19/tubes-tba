"use client"
import React, { useEffect, useState } from 'react';
import { useDataContext } from '../../utility/dataContext';
import config from '../../json/config.json';

export default function ValidPatterns() {
  const { patterns, setPatterns } = useDataContext();
  const [addValidPatterns, setAddValidPatterns] = useState(false);
  const isAddAble = config.isValidPatternAddAble;

  useEffect(() => {
    const storedPatterns = localStorage.getItem('valid_patterns');
    if (storedPatterns) {
      setPatterns(JSON.parse(storedPatterns));
    } else {
      setPatterns([
        ['S', 'P', 'O', 'K'],
        ['S', 'P', 'O'],
        ['S', 'P', 'K'],
        ['S', 'P'],
      ]);
    }
  }, []);

  const handleBlackList = (index) => {
    const updatedPatterns = [...patterns];
    updatedPatterns[index].isBlacklisted = !updatedPatterns[index].isBlacklisted;
    setPatterns(updatedPatterns);
    localStorage.setItem('valid_patterns', JSON.stringify(updatedPatterns));
  };

  return (
    <div className="border dark:border-2 border-gray-400 dark:border-gray-700 w-full rounded-lg p-5">
      <p className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700">
        VALID PATTERNS
      </p>
      <div className="my-3">
        <ol className="list-inside list-decimal font-semibold">
          {patterns.map((pattern, index) => (
            <li key={index}>
              {pattern.join(' - ')}
              <button
                type="button"
                className="emoji-button max-w-5 max-h-5 justify-center ml-3"
                onClick={() => handleBlackList(index)}
              >
                <span className="emoji-content">
                  {pattern.isBlacklisted ? '❌' : '✅'}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      
      {!addValidPatterns && isAddAble && (
        <button
          type="button"
          className="inline-flex max-w-10 max-h-10 justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-3 py-2 font-extrabold"
          onClick={() => setAddValidPatterns(!addValidPatterns)}
        >
          +
        </button>
      )}
      {addValidPatterns && (
        <div className="border-t border-gray-400 dark:border-gray-700 mt-5">
          <label
            htmlFor="stok"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Input valid patterns
          </label>
          <form className="flex flex-col gap-2">
            <input
              type="text"
              id="valid_patterns"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="S-P-O-K"
              required
            />
            <div className="flex gap-2 w-full">
              <button
                type="button"
                className="justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-3 py-2 font-normal"
                onClick={() => setAddValidPatterns(!addValidPatterns)}
              >
                X
              </button>
              <button
                type="submit"
                className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
