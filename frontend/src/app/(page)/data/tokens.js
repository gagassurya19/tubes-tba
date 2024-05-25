import React, { useState } from "react";
import config from "../../json/config.json";
import data_kata from "../../json/data_kata.json";
const data = data_kata.data;

export default function Tokens() {
  const [hideTokenizer, setHideTokenizer] = useState(false);
	const isAddAble = config.isTokenAddAble;

  return (
    <>
      {!hideTokenizer && (
        <div className="w-full flex justify-center">
          <button
            type="button"
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-3 py-2 font-extrabold"
            onClick={() => setHideTokenizer(!hideTokenizer)}
          >
            Show Tokenizer
          </button>
        </div>
      )}

      {hideTokenizer && (
        <div className="border dark:border-2 border-gray-400 dark:border-gray-700 w-full rounded-lg p-5">
          <div className="flex flex-row justify-between">
            <p className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700 w-full">
              TOKENIZER
            </p>
            <button
              type="button"
              className="inline-flex justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-3 py-2 ml-2"
              onClick={() => setHideTokenizer(!hideTokenizer)}
            >
              Hide
            </button>
          </div>

          <div className="overflow-x-auto overflow-y-hidden">
            <div className="flex flex-row gap-3 my-5">
              {Object.entries(data).map(([category, words]) => (
                <div key={category} className="basis-1/4 min-w-[250px]">
                  <div className="flex flex-col sm:flex-row items-center">
                    <p className="text-xl font-bold w-full sm:w-auto">
                      {category.toUpperCase()}
                    </p>
                  </div>
                  <div className="min-h-full flex flex-col justify-between">
                    <div className="flex flex-col justify-between flex-grow min-h-full my-2 border dark:border-2 border-gray-400 dark:border-gray-700 rounded-md p-3 w-full">
                      <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
                        {words.slice(0, 10).map((word, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                          >
                            {word}
                          </span>
                        ))}
                        {words.length > 10 && (
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/10">
                            +{words.length - 10} kata lainnya
                          </span>
                        )}
                      </div>
											{isAddAble && (
                      <form className="flex flex-col lg:flex-row gap-2 w-full mt-2">
                        <input
                          type="text"
                          name={`new_${category}`}
                          className="border-2 border-gray-400 dark:border-gray-700 rounded-md p-2 w-full text-black"
                          placeholder={`Tambahkan kata ${category}`}
                        />
                        <button
                          type="submit"
                          className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center w-full lg:max-w-20"
                        >
                          Submit
                        </button>
                      </form>

											)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
