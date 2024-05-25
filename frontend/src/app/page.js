"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataProvider } from "./utility/dataContext";

import ValidPatterns from "./(page)/data/valid_patterns";
import Tokens from "./(page)/data/tokens";
import Result from "./(page)/result/page";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    setIsLoaded(true);
  });
  if (!isLoaded) return "Loading...";

  return (
    <DataProvider>
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-5xl">
          <Header />
        </div>
        <div className="flex flex-col gap-10 items-center w-full">
          <div className="w-full max-w-screen-2xl">
            <Tokens />
          </div>
          <div className="w-full max-w-5xl">
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="flex-none w-full lg:w-56">
                <ValidPatterns />
              </div>
              <div className="flex flex-col gap-4 w-full lg:pl-4 lg:border-l border-gray-400 dark:border-gray-700">
                <Result />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-5xl">
          <Footer />
        </div>
      </div>
    </DataProvider>
  );
}
